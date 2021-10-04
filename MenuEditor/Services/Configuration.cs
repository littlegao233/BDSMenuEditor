using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Prism.Common;

namespace MenuEditor.Services
{
    internal static class Configuration
    {
        static string Path = "./Data/configuration.json";

        static JsonDataService DataService = new JsonDataService();

        static Dictionary<string, object> config = DataService.LoadData<Dictionary<string, object>>(Path);

        public static Dictionary<string, object> Get()
        {
            return config;
        }

        public static T GetValue<T>(string name)
        {
            T value;
            if (config.TryGetValue(name, out value))
            {
                return value;
            }
            else
            {
                return default;
            }
        }

        public static bool SaveValue<T>(string key, T value)
        {
            bool result = false;
            if (config.TryGetValue(key, out T old))
            {
                config[key] = value;
                result = true;
            }
            else
            {
                result = config.TryAdd(key, value);
            }
            result = Save() && result;
            return result;
        }

        public static bool Save()
        {
            return DataService.SaveData(Path, config);
        }
    }
}
/// <summary>
/// 来自.net5源码，用于弥补.net461无TryAdd的问题
/// </summary>
#region CollectionExtensions
// System.Collections.Generic.CollectionExtensions
//using System;
//using System.Collections.Generic;
//using System.Diagnostics.CodeAnalysis;
namespace System.Collections.Generic
{
    public static class CollectionExtensions
    {
        //public static TValue? GetValueOrDefault<TKey, TValue>(this IReadOnlyDictionary<TKey, TValue> dictionary, TKey key)
        //{
        //    return dictionary.GetValueOrDefault(key, default(TValue));
        //}
        //public static TValue GetValueOrDefault<TKey, TValue>(this IReadOnlyDictionary<TKey, TValue> dictionary, TKey key, TValue defaultValue)
        //{
        //    if (dictionary == null)
        //    {
        //        throw new ArgumentNullException("dictionary");
        //    }
        //    if (!dictionary.TryGetValue(key, out var value))
        //    {
        //        return defaultValue;
        //    }
        //    return value;
        //}

        public static bool TryAdd<TKey, TValue>(this IDictionary<TKey, TValue> dictionary, TKey key, TValue value)
        {
            if (dictionary == null)
            {
                throw new ArgumentNullException(nameof(dictionary));
            }
            if (!dictionary.ContainsKey(key))
            {
                dictionary.Add(key, value);
                return true;
            }
            return false;
        }

        public static bool Remove<TKey, TValue>(this IDictionary<TKey, TValue> dictionary, TKey key, [MaybeNullWhen(false)] out TValue value)
        {
            if (dictionary == null)
            {
                throw new ArgumentNullException(nameof(dictionary));
            }
            if (dictionary.TryGetValue(key, out value))
            {
                dictionary.Remove(key);
                return true;
            }
            value = default;
            return false;
        }
    }
}
#endregion