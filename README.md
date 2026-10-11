# Rahul Malhi — Cyberpunk Developer Portfolio

A responsive, multi-page portfolio for a BS Computer Science student, Python developer, and aspiring AI/ML engineer.

## Pages
- `index.html` — animated hero, selected work, CTA
- `about.html` — background and approach
- `skills.html` — editable skill groups
- `projects.html` — project details and repository link placeholders
- `contact.html` — email-app contact form

## Run locally
Open `index.html` in a browser, or use VS Code's Live Server extension. GSAP and Google Fonts load from CDNs; the layout and particle orb still work without GSAP, but external fonts/animations may be limited offline.

## Before publishing — important
1. In `contact.html`, replace `your.email@example.com` with your professional email.
2. In `assets/js/main.js`, replace the same placeholder email in the contact form handler.
3. Replace project descriptions and links with the exact repositories/demos you can verify. The project copy is clearly intended as editable sample content, not claims of verified results.
4. Add your actual CV as `assets/files/rahul-malhi-cv.pdf`. The current download link is a placeholder until you add it.
5. Confirm the skill list reflects what you can confidently discuss in an interview.
6. Update LinkedIn URL if you want to include your profile.

## Deploy on GitHub Pages
1. Create a GitHub repository (for example `rahul-portfolio`).
2. Upload all files while preserving folder structure.
3. Open repository **Settings → Pages**.
4. Under build and deployment, choose **Deploy from a branch**, select `main` and `/ (root)`, then Save.
5. Wait for the Pages URL to appear. Check every page and link after publishing.

## Motion and performance
- Canvas particle sphere uses a capped particle count and pauses while the tab is hidden.
- `prefers-reduced-motion` is respected.
- Responsive layout includes mobile navigation.
- GSAP/ScrollTrigger are loaded from CDN; no build step is required.

## Customize
Main design tokens live at the top of `assets/css/style.css`. The project cards are ordinary HTML and can be edited directly.


## Animation visibility fix
Reveal animations now trigger independently for each element. After replacing the files on GitHub, hard-refresh the published site (Ctrl+F5 on Windows) to load the updated JavaScript.


## Favicon logo
A custom neon R favicon has been added at `assets/images/favicon.png` and `assets/images/favicon.ico`, and linked from every HTML page. Upload all updated files and folders to GitHub Pages.


## Contact links
- Email: rahulmalhi1007@gmail.com
- LinkedIn: https://www.linkedin.com/in/rahul-malhi-589551233/
- GitHub: https://github.com/RahulMalhi10

The email and LinkedIn links are connected on the home page and across the page footers, with full details on the Contact page.
