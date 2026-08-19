# 📚 Amar Ekushey Boi Mela (অমর একুশে বইমেলা)

> **Cross-Platform Digital Directory, Interactive Stall Finder & Publisher Observer Platform** for Amar Ekushey Boi Mela (Bangla Academy & Suhrawardy Udyan).

Built with **Expo & React Native Cross-Platform**, targeting both **Web Browsers** and **Native Android (`.apk`)** from a single unified codebase.

---

## ✨ Key Features

### 📖 Visitor Experience
- **Live Search & Filter**: Instant search across book titles, authors, stall numbers, and genres (*Fiction, Sci-Fi, History, Thriller, Poetry*).
- **Interactive Ground Map**: Visual map of Suhrawardy Udyan & Bangla Academy fairgrounds with clickable stall locations and directions.
- **Stall Directory**: Detailed publisher cards with pavilion info, total books catalog, and subscriber count.
- **Stall Observer Subscriptions**: Follow your favorite publishers to receive real-time notifications when new books release or discounts are offered.
- **Personal Wishlist**: Save books for quick reference during fair visits.
- **Bilingual & Dual Theme**: Toggle between **বাংলা / English** and **Dark / Light** modes.

### 🏢 Publisher & Stall Staff Portal
- **Stall Management**: Update stall number, pavilion info, zone, and contact details.
- **Book Inventory Catalog**: Add new books with custom cover image URL, price (৳ BDT), genre, and description.
- **Broadcast Announcements**: Send instant push & email broadcast notifications to all registered stall observers.
- **Demo Mode**: One-click demo login as *Prothoma Prokashan* for instant testing.

---

## 🛠️ Technology Stack

- **Cross-Platform Core**: [Expo](https://expo.dev/) & [React Native for Web](https://necolas.github.io/react-native-web/)
- **UI & Styling**: Modern CSS3 Glassmorphism, Google Fonts (*Hind Siliguri* & *Outfit*), [Lucide Icons](https://lucide.dev/)
- **Backend & Data Service**: Real-time database subscriber service (`firebaseService.js`) syncing Web and Android clients instantly.
- **Build System**: Expo Metro & EAS (Expo Application Services) for native `.apk` compilation.

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/Sajid-ul-Islam/Boi-Mela.git
cd Boi-Mela
npm install
```

---

## 💻 Available Commands

| Command | Action | Description |
| :--- | :--- | :--- |
| **`npm start`** | `expo start` | Starts interactive Expo CLI menu |
| **`npm run web`** | `expo start --web` | Launches web application in browser |
| **`npm run android`** | `expo start --android` | Connects to Android device / emulator |
| **`npm run build:web`** | `expo export -p web` | Exports static web bundle (`dist`) |
| **`npm run build:apk`** | `eas build -p android --profile preview` | Compiles native `.apk` file for Android phones |
| **`npm run dev`** | `vite` | Runs lightweight Vite web dev server (`http://localhost:3000`) |

---

## 📁 Repository Structure

```
Boi-Mela/
├── App.js                      # Root React Native / Expo application wrapper
├── index.js                    # Expo entry point (registerRootComponent)
├── app.json                    # Expo manifest (package: com.boimela.app)
├── eas.json                    # EAS build configuration for Android APK
├── package.json                # Project dependencies and CLI scripts
├── index.html                  # Web HTML entry template
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navigation header & search bar
│   │   ├── SplashScreen.jsx    # Hero welcome landing & role selector
│   │   ├── VisitorView.jsx     # Main directory dashboard & book grid
│   │   ├── StaffPortal.jsx     # Publisher catalog manager & observer list
│   │   ├── BookDetailModal.jsx # Book modal view & wishlist action
│   │   ├── StallDetailModal.jsx# Stall modal catalog view
│   │   ├── InteractiveMap.jsx  # Fair ground interactive map
│   │   ├── NotificationDrawer.jsx # Observer notification center
│   │   └── Toast.jsx           # Floating notification toast
│   ├── context/
│   │   └── AppContext.jsx      # Global state provider & storage persistence
│   ├── data/
│   │   └── initialData.js      # Seed data for books, stalls & observers
│   └── services/
│       └── firebaseService.js  # Real-time backend data connector
```

---

## 📱 Mobile Preview on Android

To run the web app on your phone over Wi-Fi without installing an app:
1. Run `npm run dev` or `npm run web`.
2. Open your phone's browser and go to `http://<YOUR_COMPUTER_IP>:3000`.

To install as a native Android app:
- Run `npm run build:apk` to build the `.apk` package via EAS CLI.

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
