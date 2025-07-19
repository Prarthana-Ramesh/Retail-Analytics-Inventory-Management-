import pandas as pd
from datetime import datetime

def fill_missing_dates_csv(sheet_a_path, sheet_b_path, output_path, date_column='Order Date'):
    # Load both CSV files
    df_a = pd.read_csv(sheet_a_path)
    df_b = pd.read_csv(sheet_b_path)

    # Ensure both have the same length
    if len(df_a) != len(df_b):
        raise ValueError("CSV files must have the same number of rows")

    # Fill missing values in df_a using df_b
    for i in range(len(df_a)):
        if pd.isna(df_a.at[i, date_column]) or str(df_a.at[i, date_column]).strip() == '':
            raw_date = df_b.at[i, date_column]
            try:
                # Try to parse and reformat the date
                date_obj = pd.to_datetime(raw_date, format='%m/%d/%Y', errors='coerce')
                if pd.notna(date_obj):
                    df_a.at[i, date_column] = date_obj.strftime('%m-%d-%Y')
            except Exception as e:
                print(f"Row {i + 2}: Error processing date '{raw_date}' - {e}")

    # Save updated Sheet A
    df_a.to_csv(output_path, index=False)
    print(f"Updated file saved to: {output_path}")

# Example usage
fill_missing_dates_csv(
    sheet_a_path='preprocessed_dataset.csv',
    sheet_b_path='dataset2.csv',
    output_path='preprocessed_dataset.csv',
    date_column='Order Date'  # change if your column name is different
)
