using System.Collections.Generic;

namespace SignalRAcc.Models
{
    public class DataModel
    {
        public string Name { get; set; }
        public Queue<float> x { get; set; }
        public Queue<float> y { get; set; }
        public string Type { get; set; }
        public DataModel()
        {
            x = new Queue<float>();
            y = new Queue<float>();
        }
    }
} 