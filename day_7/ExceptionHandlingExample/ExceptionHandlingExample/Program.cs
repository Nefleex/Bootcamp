using System;
using System.IO;

namespace ExceptionHandlingExample
{
    class Program
    {
        static void Main(string[] args)
        {
            string url = @"C:\Users\Lenovo\Desktop\Udemy Node.js\11. Handling and Logging Errors";
            FileStream stream = null;

            try
            {
                stream = new FileStream(url, FileMode.Create);

                stream.WriteByte(1);
                stream.WriteByte(2);
                stream.WriteByte(3);
                Console.WriteLine("Tiedoston tiedot päivitetty.");

            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
            }
            finally
            {
                stream.Close();
            }

            
            //string file;

          // unlocalize.com
          // log4net , library for exception handling
          // executing code in exceptions (catch) blocks is more expensive than if ... else
          // nested try finally try catch statements

            //try
            //{
            //    file = File.ReadAllText(url);

            //    Console.WriteLine(file);
            //    Console.ReadLine();
            //}
            //catch(FileNotFoundException e)
            //{
            //    Console.WriteLine($"File from {url} not found.");
            //    Console.WriteLine(e.Message);
            //    File.WriteAllText(@"C:\Temp\Log1.txt", e.Message);

            //    Console.ReadLine();
            //}
            //catch (UnauthorizedAccessException e)
            //{
            //    Console.WriteLine($"No permission to access {url}.");
            //    Console.WriteLine($"Error Message: {e.Message}");

            //    // File.WriteAllText(@"C:\Temp\Log1.txt", e.Message);

            //    Console.ReadLine();
            //}
           

        }
    }
}
