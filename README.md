# TenTwenty Assignment – React + Tailwind + SCSS

## 📌 Overview

This project is a **pixel-perfect, responsive frontend template** built using **ReactJS**, **JavaScript**, **Tailwind CSS**, and **SCSS** as per the assignment guidelines.

The goal was to replicate the provided Figma design with high fidelity while showcasing strong fundamentals in frontend development, code structure, component reuse, and basic SEO practices.

I am proud of the outcome — particularly because the design was challenging and lacked certain responsive/mobile views. I took initiative to fill those gaps and added subtle UI details to enhance the user experience.

---

## 🧱 Tech Stack

- **ReactJS** (set up manually, _no CRA used_)
- **Vanilla JavaScript (ES6+)**
- **Tailwind CSS**
- **SCSS (for custom animations and overrides)**
- **HTML5 semantic structure**

---

## ✅ Key Features

- ⚙️ **Manually configured React environment** (without create-react-app or any boilerplates)
- 📱 **Fully responsive design** for both desktop and mobile
- 🌗 **Custom mobile navbar** with animations and interactions (created from scratch due to missing mobile design)
- 🔁 **Reusable, modular components**
- 💡 **Clean, scalable, and readable code** with meaningful variable and component naming
- 🧠 **SCSS for animation and keyframe logic**
- 🧭 **Basic SEO optimization**:
  - Semantic HTML tags
  - Descriptive `<title>` and `<meta>` tags
  - Proper heading structure (H1–H3)

---

## 📁 Project Structure

├── public/
│ ├── images/ # All the images used in the template
| ├── favicon.ico # Site icon
| ├── index.html
├── src/
│ ├── components/ # Reusable React components
│ | ├── icons/ # Svg icon components
│ ├── config/ # Some animation and visual settings
│ ├── constants/ # Static values and mock data
│ ├── hooks/ # Custom hooks
│ ├── sections/ # Sections on the template page
│ ├── styles/ # Centralized scss file
│ ├── utils/ # Utility functions
│ ├── App.jsx
│ └── index.js
├── babel.config.js # Babel instructions for transpining jsx
├── postcss.config.js # For tailwind support
├── tailwind.config.js
└── webpack.config.js # Webpack packaging instructions

---

## 🔍 How to Run Locally

1. Clone the repo:

```bash
git clone https://github.com/jaydeep-mithani/TenTwenty-FE-Test.git
cd TenTwenty-FE-Test
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start

```

💡 Note
I took the initiative to add some effects in the nav bar to make the templete look more complete. The extra implementations are — hover underline for nav links, hover effect on contact button, nav bar expansion to full width upon scroll and mobile nav menu.

🚀 Conclusion
This project reflects my commitment to quality, detail, and scalability — from pixel-perfect layout to clean component architecture and performance-aware design. Thank you for reviewing my work!
