var System = dotnet.System;
var StreamWriter = System.IO.StreamWriter;
var Encoding = System.Text.Encoding;

var path = DIRECTORY.FullName + "\\PFessentials";

System.IO.Directory.CreateDirectory(path);

var Data = {
    Menus: JSON.parse(DATA.Menus),
    Modals: JSON.parse(DATA.Modals)
    //todo PFEssentials暂无ModalsForm
}
main(Data);

function Button(model) {
    const buttonType = [
        "default",
        "temporary",
        "op",
        "cmd",
        "code",
        null,
        "menu",
        "AMenu"
    ];

    this.moneyX = false;
    if (model.Image != null) {
        if (model.Image != "") {
            this.imageX = true;
            this.image = model.Image;
        } else {
            this.imageX = false;
        }
    } else {
        this.imageX = false;
    }
    if (model.Text) this.text = model.Text;
    this.cmd = new Array;
    if (model.ButtonExecutes != null) {
        for (const exe of model.ButtonExecutes) {
            this.cmd.push(
                {
                    command: exe.Execute,
                    type: buttonType[exe.Type]
                }
            );
        }

    }
}

function Menu(title, content, buttons) {
    this.type = "form";
    this.title = title;
    this.content = content;
    this.buttons = new Array;
    for (const btn of buttons) {
        if (btn) {
            this.buttons.push(new Button(btn));
        }
    }
}

function ModalForm(model) {
    function _Button(model) {
        const buttonType = [
            "default",
            "temporary",
            "op",
            "cmd",
            "code",
            null,
            "menu",
            "AMenu"
        ];

        if (model.Text) this.text = model.Text;
        this.cmd = new Array;
        if (model.ButtonExecutes != null) {
            for (const exe of model.ButtonExecutes) {
                this.cmd.push(
                    {
                        command: exe.Execute,
                        type: buttonType[exe.Type]
                    }
                );
            }

        }
    }

    if (model) {
        if (model.Title) this.title = model.Title;
        if (model.Content) this.content = model.Content;
        if (model.ButtonOne) this.button1 = new _Button(model.ButtonOne);
        if (model.ButtonTwo) this.button2 = new _Button(model.ButtonTwo);
    }
}

function ShowErrorDialog(s) {
    MessageBox.Show(
        "遇到错误",
        s,
        MessageBoxButton.OK,
        MessageBoxImage.Information);
}

function AddButton(data) {

}

function main(args) {
    let menuData = {};
    for (let menu of args.Menus) {
        if (menu) {
            try {
                AddButton(menu)
            } catch (error) {

            }
            let _menu = new Menu(menu.Title, menu.Content, menu.Buttons);
            let sw = new StreamWriter(path + "\\" + menu.FileName + ".json", false, Encoding.UTF8);
            sw.AutoFlush = true;
            sw.Write(JSON.stringify(_menu, undefined, 4));
            sw.Close();
            sw.Dispose();
        }

    }

    for (let modal of args.Modals) {
        /*if (modal) {
            let _modal = new ModalForm(modal);
            let sw = new StreamWriter(path + "\\" + modal.FileName + ".json", false, Encoding.UTF8);
            sw.AutoFlush = true;
            sw.Write(JSON.stringify(_modal, undefined, 4));
            sw.Close();
            sw.Dispose();
        }*/
        MessageBox.Show(
            "PFEssentials暂无ModalsForm",
            "ModalsForm内容已忽略",
            MessageBoxButton.OK,
            MessageBoxImage.Information);
        break;
    }

    MessageBox.Show(
        "导出成功！",
        "导出完成",
        MessageBoxButton.OK,
        MessageBoxImage.Information);

    var p = new System.Diagnostics.Process();
    p.StartInfo.FileName = "explorer.exe";
    p.StartInfo.Arguments = path;
    p.Start();
}