using System;

namespace DateTimeConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            //Console.WriteLine("Enter Date: ");

            //string userInput = Console.ReadLine();
            //DateTime date = DateTime.Parse(userInput);
            //Console.WriteLine(date);
            //Console.ReadLine();

            // function that takes a year as parameter and prints first day and last day of said year

            // PrintStartAndEndOfYearDates(1991);
            LifeOnEarth(1991, 1, 1);
        }

        static void PrintStartAndEndOfYearDates(int year)
        {
            
            DateTime startOfYear= new DateTime(year, 1, 1);
            DateTime endOfYear = startOfYear.AddYears(1).AddMilliseconds(-3); // mySQL accuracy is 3 ms
            Console.WriteLine(startOfYear);
            Console.WriteLine(endOfYear);
            Console.ReadLine();
        }
        static void LifeOnEarth(int year, int month, int date)
        {
            DateTime dateOfBirth = new DateTime(year, month, date);
            TimeSpan timeOnEarth = DateTime.Now - dateOfBirth;
            Console.WriteLine(timeOnEarth);
            Console.WriteLine(Math.Round(timeOnEarth.TotalMinutes));
            Console.ReadLine();
        }
    }
}
