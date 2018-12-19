using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleTest
{
    class Program
    {
        static void Main(string[] args)
        {
            string firstInput;
            string secondInput;
            int firstIntVal;
            int secondIntVal;

            int addInts()
            {
                return firstIntVal + secondIntVal;
            }

            Console.Write("This program will add two intergers.\nEnter first interger: ");
            firstInput = Console.ReadLine();
            firstIntVal = Convert.ToInt32(firstInput);
            Console.WriteLine("You entered: " + firstIntVal);

            Console.WriteLine("Enter second interger: ");
            secondInput = Console.ReadLine();

            secondIntVal = Convert.ToInt32(secondInput);
            Console.WriteLine("You entered: " + secondIntVal);

            Console.WriteLine("Sum of your integers is: " + addInts());
            Console.ReadLine();
        }
    }
}
