import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("../data/raw/loan_data.csv")

# print("First 5 rows:")
# print(df.head())

# print("\nDataset Info:")
# print(df.info())

df["credit_score"].hist()
plt.title("Credit Score Distribution")
plt.show()