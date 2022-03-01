using System;
using System.Collections.Generic;
using SignalRAcc.Models;

namespace SignalRAcc.DataStorage
{
    public static class DataManager
    {
        public static List<DataModel>GetData()
        {
            var r = new Random();
            return new List<DataModel>()
            {
                new DataModel {Data = new List<int> {r.Next(1,40) }, Label = "Data1"},
                new DataModel {Data = new List<int> {r.Next(1,40) }, Label = "Data2"},
                new DataModel {Data = new List<int> {r.Next(1,40) }, Label = "Data3"},
                new DataModel {Data = new List<int> {r.Next(1,40) }, Label = "Data4"}
            };
        }
    }
}