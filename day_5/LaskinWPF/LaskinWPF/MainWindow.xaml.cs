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

namespace LaskinWPF
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            int firstField, secondField, result;

          

            firstField = Convert.ToInt32(FirstField.Text);
            secondField = Convert.ToInt32(SecondField.Text);
            result = firstField + secondField;

            Result.Text = result.ToString();

            void clickAdd(object sender, RoutedEventArgs e)
            {
                result = firstField + secondField;
                Result.Text = result.ToString();
            }

            void clickSubstract(object sender, RoutedEventArgs e)
            {
                result = firstField - secondField;
                Result.Text = result.ToString();
            }

            void clickMultiply(object sender, RoutedEventArgs e)
            {
                result = firstField * secondField;
                Result.Text = result.ToString();
            }

            void clickDivide(object sender, RoutedEventArgs e)
            {
                result = (firstField / secondField);
                Result.Text = result.ToString();
            }



        }
    }
}
