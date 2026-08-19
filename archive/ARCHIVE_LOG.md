# 📦 Boi-Mela Archive Log

> **Archived Date:** 19 August 2026  
> **Purpose:** Cleaning root directory by archiving legacy 2019 Android Java & XML layout source files and unused build configs, mapping their functionality to the unified Expo Cross-Platform codebase.

---

## 🗂️ Summary of Archived Files & Replacements

| Archived Legacy File / Directory | Original Function | Replaced By (Active Codebase) |
| :--- | :--- | :--- |
| **`vite.config.js`** | Former Vite web bundler configuration | Expo Metro Bundler ([`app.json`](file:///home/bearded/Documents/GitHub/Boi-Mela/app.json) & [`package.json`](file:///home/bearded/Documents/GitHub/Boi-Mela/package.json)) |
| **`SeparateUserActivity.java`** | Role selection between General Visitor & Publisher Staff | [`src/components/SplashScreen.jsx`](file:///home/bearded/Documents/GitHub/Boi-Mela/src/components/SplashScreen.jsx) & [`Header.jsx`](file:///home/bearded/Documents/GitHub/Boi-Mela/src/components/Header.jsx) |
| **`SplashScreenActivity.java`** | Native Android splash loading screen | [`src/components/SplashScreen.jsx`](file:///home/bearded/Documents/GitHub/Boi-Mela/src/components/SplashScreen.jsx) & [`app.json`](file:///home/bearded/Documents/GitHub/Boi-Mela/app.json) |
| **`MainActivity1.java`** | Publisher login & Google auth flow | [`src/components/StaffPortal.jsx`](file:///home/bearded/Documents/GitHub/Boi-Mela/src/components/StaffPortal.jsx) |
| **`stafflogin/`** | Staff login, signup, & reset password activity views | [`src/components/StaffPortal.jsx`](file:///home/bearded/Documents/GitHub/Boi-Mela/src/components/StaffPortal.jsx) |
| **`AddInformationActivity.java`** | Form for publisher to add a new book | [`src/components/StaffPortal.jsx`](file:///home/bearded/Documents/GitHub/Boi-Mela/src/components/StaffPortal.jsx) (*Add Book Modal*) |
| **`AddStallInformationActivity.java`**| Form for updating stall details & owner info | [`src/components/StaffPortal.jsx`](file:///home/bearded/Documents/GitHub/Boi-Mela/src/components/StaffPortal.jsx) & [`StallDetailModal.jsx`](file:///home/bearded/Documents/GitHub/Boi-Mela/src/components/StallDetailModal.jsx) |
| **`BookDetails.java`** | Java Data Model for book attributes | [`src/data/initialData.js`](file:///home/bearded/Documents/GitHub/Boi-Mela/src/data/initialData.js) & [`src/context/AppContext.jsx`](file:///home/bearded/Documents/GitHub/Boi-Mela/src/context/AppContext.jsx) |
| **`BookDetailsList.java`** & **`BookListFetch.java`** | Adapter for rendering book list items | [`src/components/VisitorView.jsx`](file:///home/bearded/Documents/GitHub/Boi-Mela/src/components/VisitorView.jsx) |
| **`SearchActivity.java`** | Real-time Firebase search logic | [`src/components/VisitorView.jsx`](file:///home/bearded/Documents/GitHub/Boi-Mela/src/components/VisitorView.jsx) & [`Header.jsx`](file:///home/bearded/Documents/GitHub/Boi-Mela/src/components/Header.jsx) |
| **`RegisterObservers.java`** & **`RegisterObserverList.java`** | Observer subscription handler | [`src/context/AppContext.jsx`](file:///home/bearded/Documents/GitHub/Boi-Mela/src/context/AppContext.jsx) (`subscribeObserver`) |
| **`ViewObserversActivity.java`** | Publisher view of stall subscribers | [`src/components/StaffPortal.jsx`](file:///home/bearded/Documents/GitHub/Boi-Mela/src/components/StaffPortal.jsx) (*Observer Table*) |
| **`SetNotificationOnActivity.java`** & **`SetNotificationOffActivity.java`** | Notification toggle settings | [`src/components/NotificationDrawer.jsx`](file:///home/bearded/Documents/GitHub/Boi-Mela/src/components/NotificationDrawer.jsx) |
| **`bookinfo.java`** | Micro data class for book info | [`src/data/initialData.js`](file:///home/bearded/Documents/GitHub/Boi-Mela/src/data/initialData.js) |
| **`activity_main.xml`** ... **`stalldetails_layout.xml`** | Legacy Android XML layouts | React JSX components in `src/components/` & CSS glassmorphic theme in `src/index.css` |
| **`fetch`** & **`stuffAct`** | Temporary terminal scratch scripts | Integrated into package CLI scripts |

---

## 🧹 Working Directory Cleanliness

The root project directory now exclusively contains active, working cross-platform project files:
- `App.js` & `index.js` (Expo entry points)
- `app.json` & `eas.json` (Expo & Android APK build configs)
- `package.json` & `README.md`
- `src/` (Active cross-platform React Native / React application)
