using System;

namespace ConsoleApp1
{
    class Program
    {
        static void Main(string[] args)
        {
            int laskuri2 = 0;

            while (laskuri2 < 10)
            {
                Console.WriteLine(laskuri2);
                laskuri2 = laskuri2 + 5;
            }
            Console.WriteLine("Loop finished");
            Console.WriteLine(laskuri2);
            Console.ReadLine();
        }
    }
}
