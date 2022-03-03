using System;
using System.Collections.Generic;
using System.Drawing;
using System.Threading.Tasks;
using SignalRAcc.Models;

namespace SignalRAcc.DataStorage
{
    
    public class DataManager
    {
        public List<DataModel> Data { get; set; }
        public DataManager()
        {
            var r = new Random();
            var result = new List<DataModel>();
            
            Data = new List<DataModel>{
                        new DataModel {x = new Queue<float> {}, y = new Queue<float> {}, Name = "Accelerometer 1"},
                        new DataModel {x = new Queue<float> {}, y = new Queue<float> {}, Name = "Accelerometer 2"},
                        new DataModel {x = new Queue<float> {}, y = new Queue<float> {}, Name = "Average"}
            };

            if (Program.isItMeasuring == false)
            {
                Task.Run(async () => {
                await MeasuringAcc();
            });
            }

            


        }
        public List<DataModel> GetData()
        {
            var dataForReturn = new List<DataModel>{
                        new DataModel {x = new Queue<float> {}, y = new Queue<float> {}, Name = "Accelerometer 1", Type="line"},
                        new DataModel {x = new Queue<float> {}, y = new Queue<float> {}, Name = "Accelerometer 2", Type="line"},
                        new DataModel {x = new Queue<float> {}, y = new Queue<float> {}, Name = "Average" , Type="line"}
            };
            try
            {
                dataForReturn[0].y.Enqueue(Data[0].y.Dequeue());
                dataForReturn[1].y.Enqueue(Data[1].y.Dequeue());
                dataForReturn[2].y.Enqueue(Data[2].y.Dequeue());

                dataForReturn[0].x.Enqueue(Data[0].x.Dequeue());
                dataForReturn[1].x.Enqueue(Data[1].x.Dequeue());
                dataForReturn[2].x.Enqueue(Data[2].x.Dequeue());
            }
            catch (System.Exception)
            {
                //swallow
            }
            
            /*
            for (int i = 0; i < 1333; i++)
            {
                
            }*/

            return dataForReturn;
        }
        private async Task MeasuringAcc()
        {
            try
            {
                Program.isItMeasuring = true;
                while (true)
                {
                    for (int i = 0; i < 500; i++)
                    {
                        Data = CalculatePoints(i * 1483, (i+1) * 1483, Data);
                        await Task.Delay(TimeSpan.FromMilliseconds(200));
                    }

                    Program.isItMeasuring = false;
                }
            }
            catch (System.Exception)
            {
                //swallow
            }
            
        }
        private double ConvertToRadians(int angle)
        {
            return (Math.PI * angle) / 100;
        }
        private double GetSin(int angle)
        {
            double radians = ConvertToRadians(angle);
            return Math.Sin(radians);
        }
        private double GetCos(int angle)
        {
            double radians = ConvertToRadians(angle);
            return Math.Cos(radians);
        }
        private List<DataModel> CalculatePoints(int startRange, int stopRange, List<DataModel> data)
        {
            for (int i = startRange; i < stopRange; i++)
            {
                float sineY = (float)GetSin(i) * (-1);
                float cosineY = (float)GetCos(i) * (-1);

                data[0].y.Enqueue(sineY);
                data[1].y.Enqueue(cosineY);
                data[2].y.Enqueue(sineY + cosineY);

                data[0].x.Enqueue(i);
                data[1].x.Enqueue(i);
                data[2].x.Enqueue(i);

            }

            return data;
        }
    }
}