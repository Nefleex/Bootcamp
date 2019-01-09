using System;

namespace Datesv2._0
{
    class Program
    {
        static void Main(string[] args)
        {
            string userInput;
            DateTime userDate ="1.1.1991";

            Console.WriteLine("Enter Date");
            userInput = Console.ReadLine();

            try
            {
                DateTime.TryParse(userInput, out userDate);
            }
            catch (Exception e)
            {
                Console.WriteLine("Input was not a valid date.");
            }

            Console.WriteLine(userDate);
            Console.ReadLine();
        }
    }
}
