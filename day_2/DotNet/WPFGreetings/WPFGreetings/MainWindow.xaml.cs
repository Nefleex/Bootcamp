using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace WPFGreetings
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        string firstname = "";
        string lastname = "";
        string age = "";
        string email = "";

        private void colorBorder(TextBox textbox, string str) 
            {
            if (str.Length < 1 )
                 {
                textbox.BorderBrush = Brushes.Red;
            }
            else
            {
                textbox.BorderBrush = Brushes.Gray;
            }
        }


        private void formValidation()
        {
            // checking if email contains @ sign and isn't empty
            if(!email.Contains("@") || email.Length < 1)
            {
                Email.BorderBrush = Brushes.Red;
            } else if (email.Contains("@") && email.Length > 0)
            {
                Email.BorderBrush = Brushes.Gray;
            }

            //check that fields are not empty
            colorBorder(firstName, firstname);
            colorBorder(lastName, lastname);
            colorBorder(Age, age);


            //catching exception where Int32 can't parse Age textbox string to int
            try
            {
                int ageInteger = Int32.Parse(age);
                Age.BorderBrush = Brushes.Gray;

            }
            catch (FormatException)
            {
                Age.BorderBrush = Brushes.Red;
            }

        }


        public MainWindow()
        {
            InitializeComponent();
        }


        private void Submit_Click(object sender, RoutedEventArgs e)
        {
            firstname = firstName.Text;
            lastname = lastName.Text;
            age = Age.Text;    
            email = Email.Text;

            formValidation();

            if (email.Contains("@") && email.Length > 0 && firstname.Length > 0 && lastname.Length > 0 && age.Length > 0 && (checkBox.IsChecked ?? false))
            {
                submitFN.Content = "First Name: " +  firstname + "\nLast Name: " + lastname + "\nAge: " + age + "\nEmail: " + email + "\n\n\nWelcome, " + firstname + " " + lastname;
            }







        }
    }
}
