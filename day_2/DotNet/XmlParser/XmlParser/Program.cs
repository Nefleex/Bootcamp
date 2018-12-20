using System;
using System.IO;
using System.Net;
using System.Xml;

namespace XmlParser
{
    class Program
    {
        static void Main(string[] args)
        {
            // Create a request for the URL.   
            WebRequest request = WebRequest.Create(
              "https://feeds.yle.fi/uutiset/v1/recent.rss?publisherIds=YLE_UUTISET");
            // If required by the server, set the credentials.  
            request.Credentials = CredentialCache.DefaultCredentials;
            // Get the response.  
            WebResponse response = request.GetResponse();
            // Display the status.  
            Console.WriteLine(((HttpWebResponse)response).StatusDescription);
            // Get the stream containing content returned by the server.  
            Stream dataStream = response.GetResponseStream();
            // Open the stream using a StreamReader for easy access.  
            StreamReader reader = new StreamReader(dataStream);
            // Read the content.  
            string responseFromServer = reader.ReadToEnd();
  
            XmlDocument doc = new XmlDocument();

            doc.LoadXml(responseFromServer);

            XmlElement root = doc.DocumentElement;

            XmlNodeList titles = doc.GetElementsByTagName("title");

            foreach (XmlNode title in titles)
            {
                Console.WriteLine(title.InnerXml);
                Console.WriteLine("---");

            }



            Console.ReadLine();
            reader.Close();
            response.Close();
        }
    }
}
