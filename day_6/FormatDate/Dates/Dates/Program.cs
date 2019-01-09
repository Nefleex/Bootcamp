using System;

namespace Dates
{
    class Program
    {
        static void Main(string[] args)
        {
            string userInput;
            DateTime userDate;
            
            Console.WriteLine("Enter Date");
            userInput = Console.ReadLine();
            if(DateTime.TryParse(userInput, out userDate ))
            {
                Console.WriteLine(userDate);
                Console.WriteLine(DateTime.MinValue);
            }

            //try
            //{
            //    DateTime.TryParse(userInput, out userDate);
            //}
            //catch (Exception e)
            //{
            //    Console.WriteLine("Input was not a valid date.");
            //}

            Console.WriteLine(userDate);
            Console.ReadLine();
        }
    }
}
