# Retail Analytics & Inventory Management

## Project Overview

**Retail Analytics & Inventory Management** is a data-driven, interactive web platform designed to help retail businesses derive actionable insights from sales data. It enables users to **upload their own datasets** or use a built-in demo dataset to visualize sales trends, forecast demand, analyze customer behavior, and identify cross-selling opportunities — all within an intuitive dashboard.

This project is built as part of a research initiative and is published in the *International Journal of Scientific Research in Engineering and Management (IJSREM)*.

---

## 🔗 Live Demo & Paper

* **Live Web App**: [retail-analytics-inventory-manageme.vercel.app](https://retail-analytics-inventory-manageme.vercel.app/)
* **Published Research Paper**: [Retail Analysis and Inventory Management (IJSREM, Vol 09, Issue 02, Feb 2025)](https://ijsrem.com/download/retail-analysis-and-inventory-management/)
  **DOI**: [10.55041/IJSREM41644](https://doi.org/10.55041/IJSREM41644)

---

## Features

| **Feature**                | **Description**                                                                 |
|---------------------------|---------------------------------------------------------------------------------|
|**Sales Trend Analysis** | Understand sales behavior across time, category, and geography|
|**Inventory Optimization** | Forecast demand and avoid overstock/stockout|
|**Predictive Modeling** | ARIMA and Random Forest for sales forecasting|
|**Association Rule Mining** | Discover product bundles and cross-selling strategies using Apriori|
|**Customer Segmentation** | Cluster customers using K-Means based on buying behavior|
|**Regional Analytics** | Insights by city, region, and product categories|
|**Interactive Dashboards** | Built using **Node.js**, **Power BI**, and **Tableau**|

---

## Tech Stack

### Backend & Analysis

* Python, pandas, numpy, scikit-learn, mlxtend, statsmodels
* Machine Learning:

  * Random Forest Regressor
  * ARIMA (time series)
  * K-Means Clustering
  * Apriori (association mining)

### Frontend

* Vite, Tailwind CSS, React, Typescript
* Chart Libraries: Chart.js, D3.js, Plotly.js, recharts.js

### Visualization Tools

* Power BI
* Tableau

---

## Dataset Requirements

To upload and analyze your own dataset, ensure it contains the following columns:

```plaintext
Order Date, Region, City, Category, Sub-Category, Sales, Profit, Quantity, Discount, Customer ID/Customer Name
```

A sample demo dataset is also provided for quick testing.

---
## Research Highlights

Published in **IJSREM (SJIF Rating: 8.448, Feb 2025)**
Title: *Retail Analysis and Inventory Management*

### Abstract Summary:

> This work integrates retail analytics and inventory optimization through machine learning techniques like association analysis, time series forecasting, and customer clustering. It provides scalable dashboards that assist retail enterprises in demand prediction, profitability tracking, and sales behavior analysis.

#### Key Contributions:

* Inventory forecasting via ARIMA & Random Forest
* Association rules (Apriori) to discover co-purchased items
* Regional performance tracking (city/region/category)
* Data visualization for strategic decision-making

---

## Authors

* Ballupet Prakash Monal
* Manyamala Sunaina
* Monisha A
* Prarthana Ramesh
* Priyanka TR
* **Mentor:** Rekha BS (Professor, RVCE)

> Department of ISE, CSE, and AIML, RV College of Engineering, Bengaluru, India

---

## Citation

If you use this work, please cite the paper:

```
@article{retail2025analysis,
  title={Retail Analysis and Inventory Management},
  author={Manyamala Sunaina, Monisha A, Ballupet Prakash Monal, Prarthana, and Priyanka TR and Rekha, BS},
  journal={International Journal of Scientific Research in Engineering and Management (IJSREM)},
  volume={9},
  number={2},
  year={2025},
  doi={10.55041/IJSREM41644}
}
```
---
