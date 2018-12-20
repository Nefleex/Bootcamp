using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GuessNumber
{
    class Program
    {
        static void Main(string[] args)
        {
            Random random = new Random();
            int randomNum = random.Next(1, 20);
            string userInput;
            int inputValue;

            

            Console.Write("Number between 1 and 20 has been generated.\nGuess the number!: ");

            userInput = Console.ReadLine();
            inputValue = Convert.ToInt32(userInput);

            //TO-DO: Handling non-numberic input

            while ((inputValue != randomNum) )
            {
                    if (inputValue < 21 || inputValue > 0)
                Console.WriteLine("Wrong Number \nTry again: ");
                userInput = Console.ReadLine();
                inputValue = Convert.ToInt32(userInput);

                    if (inputValue > 20 || inputValue < 0)
            {
                Console.WriteLine("Number you entered is not within required parameter (less than 1 or greater than 20\nTry Again");
                        userInput = Console.ReadLine();
                inputValue = Convert.ToInt32(userInput);
            }
            }
            
            if ( inputValue == randomNum)
            {
                Console.WriteLine("Correct! The random number was: " + randomNum);
                Console.ReadLine();
            }
            
            Console.ReadLine();
            



        }
    }
}
