using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NameQuery
{
    class Program
    {
        static void Main(string[] args)
        {
            string userInput;

            Console.WriteLine("Enter your name");

            userInput = Console.ReadLine();


            Console.BackgroundColor = ConsoleColor.Red;
            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine("Hello " + userInput + "!");
            Console.ResetColor();
            Console.ReadLine();
        }
    }
}
