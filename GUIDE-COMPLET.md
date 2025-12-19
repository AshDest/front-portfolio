# 📧 Guide Complet - Formulaire de Contact avec Email

## 🎯 Résumé des Changements

J'ai implémenté **DEUX SOLUTIONS** pour recevoir les emails de contact depuis votre portfolio :

### ✅ Solution 1 : PHP Backend (Recommandé si vous avez un serveur PHP)
- **Fichier créé** : `send-email.php`
- **Fichiers modifiés** : `index.html`, `script.js`

### ✅ Solution 2 : EmailJS (Recommandé pour hébergement statique)
- **Fichiers créés** : `script-emailjs.js`, `emailjs-setup.html`
- **Fichier à modifier** : `index.html` (changer le script)

---

## 🚀 OPTION 1 : Configuration PHP (Serveur PHP requis)

### Étape 1 : Configurer votre email
Ouvrez `send-email.php` et modifiez la ligne 7 :
```php
$to_email = "votre-email@example.com"; // ⬅️ CHANGEZ ICI
```

### Étape 2 : Télécharger sur votre serveur
Uploadez tous les fichiers sur votre hébergement web :
- `index.html`
- `script.js`
- `send-email.php` ⬅️ Important !
- Autres fichiers (style.css, images, etc.)

### Étape 3 : Tester
1. Ouvrez votre site dans un navigateur
2. Remplissez le formulaire de contact
3. Cliquez sur "Send Message"
4. Vérifiez votre email (et le dossier spam!)

### ⚠️ Problèmes possibles
- **Erreur 404** : `send-email.php` n'est pas au bon endroit
- **Mail not sent** : Configuration SMTP du serveur à vérifier
- **CORS error** : Accédez via http:// et non file://

---

## 🌐 OPTION 2 : Configuration EmailJS (Plus simple, sans serveur)

### Étape 1 : Créer un compte EmailJS
1. Allez sur https://www.emailjs.com/
2. Créez un compte gratuit
3. Confirmez votre email

### Étape 2 : Configurer un Service
1. Dans EmailJS Dashboard → **Email Services**
2. **Add New Service** → Choisir Gmail
3. Connectez votre compte Gmail
4. Notez votre **Service ID**

### Étape 3 : Créer un Template
1. Allez dans **Email Templates**
2. **Create New Template**
3. Configurez :

**Subject:**
```
Nouveau message de {{from_name}}
```

**Content:**
```
De: {{from_name}}
Email: {{from_email}}
Sujet: {{subject}}

Message:
{{message}}
```

4. Notez votre **Template ID**

### Étape 4 : Obtenir votre Public Key
1. **Account** → **General**
2. Copiez votre **Public Key**

### Étape 5 : Modifier votre site

#### A. Dans `index.html`
Ajoutez dans `<head>` :
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```

Changez à la fin du fichier, avant `</body>` :
```html
<!-- ANCIENNE LIGNE À SUPPRIMER -->
<!-- <script src="script.js"></script> -->

<!-- NOUVELLE LIGNE -->
<script src="script-emailjs.js"></script>
```

#### B. Dans `script-emailjs.js`
Modifiez les lignes 3-7 avec vos identifiants :
```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'VOTRE_PUBLIC_KEY',    // ⬅️ Collez votre Public Key
    SERVICE_ID: 'VOTRE_SERVICE_ID',     // ⬅️ Collez votre Service ID
    TEMPLATE_ID: 'VOTRE_TEMPLATE_ID'    // ⬅️ Collez votre Template ID
};
```

### Étape 6 : Tester
1. Ouvrez `index.html` dans un navigateur
2. Testez le formulaire de contact
3. Vérifiez votre email

---

## 📊 Comparaison des Solutions

| Critère | PHP | EmailJS |
|---------|-----|---------|
| **Serveur PHP requis** | ✅ Oui | ❌ Non |
| **Difficulté** | Moyenne | Facile |
| **Gratuit** | ✅ Oui | ✅ Oui (100/mois) |
| **Hébergement** | Apache/Nginx + PHP | N'importe où |
| **Configuration** | 5 minutes | 10 minutes |
| **Limite emails** | Aucune | 100/mois (gratuit) |

---

## 💡 Quelle Solution Choisir ?

### Choisissez **PHP** si :
- ✅ Vous avez un hébergement web avec PHP (OVH, Hostinger, etc.)
- ✅ Vous attendez beaucoup de messages
- ✅ Vous voulez un contrôle total

### Choisissez **EmailJS** si :
- ✅ Vous hébergez sur GitHub Pages, Netlify, Vercel
- ✅ Vous voulez quelque chose de simple et rapide
- ✅ Vous recevez moins de 100 messages/mois
- ✅ Vous n'avez pas de serveur PHP

---

## 📁 Structure des Fichiers

```
myportfolio/
├── index.html              # Formulaire de contact (modifié)
├── script.js               # Script original avec PHP backend
├── script-emailjs.js       # Script alternatif avec EmailJS
├── send-email.php          # Backend PHP pour emails
├── emailjs-setup.html      # Guide détaillé EmailJS
├── README-EMAIL.md         # Guide PHP détaillé
└── GUIDE-COMPLET.md        # Ce fichier
```

---

## 🔧 Instructions Rapides

### Pour PHP (5 minutes)
```bash
1. Ouvrir send-email.php
2. Changer $to_email = "votre-email@example.com"
3. Uploader tous les fichiers sur votre serveur
4. Tester le formulaire
```

### Pour EmailJS (10 minutes)
```bash
1. Créer compte sur emailjs.com
2. Configurer service + template
3. Copier Public Key, Service ID, Template ID
4. Modifier script-emailjs.js avec vos IDs
5. Dans index.html, changer script.js → script-emailjs.js
6. Ajouter <script> EmailJS dans <head>
7. Tester le formulaire
```

---

## 🎨 Personnalisation

### Changer le message de succès
Dans `script.js` ou `script-emailjs.js`, ligne avec `alert('✅ ...')` :
```javascript
alert('✅ Votre message personnalisé ici!');
```

### Changer l'email de réception (PHP)
Dans `send-email.php` :
```php
$to_email = "nouvelle-adresse@example.com";
```

### Ajouter un champ au formulaire
1. Dans `index.html` :
```html
<input type="tel" name="phone" placeholder="Téléphone">
```

2. Dans `script-emailjs.js` :
```javascript
phone: this.querySelector('[name="phone"]').value
```

3. Dans EmailJS Template :
```
Téléphone: {{phone}}
```

---

## 🐛 Dépannage

### "Form not sending"
- Vérifiez que vous accédez via http:// (pas file://)
- Ouvrez la console (F12) pour voir les erreurs
- Vérifiez que tous les IDs sont corrects (EmailJS)

### "404 Not Found"
- `send-email.php` doit être dans le même dossier que `index.html`
- Vérifiez les majuscules/minuscules dans les noms de fichiers

### "CORS Error"
- Utilisez un serveur web local (XAMPP, WAMP, ou `php -S localhost:8000`)
- Ou uploadez sur un vrai serveur

### "Email not received"
- ✅ Vérifiez le dossier spam
- ✅ Vérifiez que l'adresse email est correcte
- ✅ Attendez quelques minutes
- ✅ Vérifiez les logs du serveur (PHP) ou EmailJS dashboard

---

## 📞 Support

### Documentation officielle
- **EmailJS** : https://www.emailjs.com/docs/
- **PHP mail()** : https://www.php.net/manual/en/function.mail.php

### Fichiers d'aide inclus
- `emailjs-setup.html` - Guide visuel EmailJS (ouvrir dans navigateur)
- `README-EMAIL.md` - Guide détaillé PHP

---

## ✅ Checklist

### Pour PHP
- [ ] J'ai modifié `$to_email` dans `send-email.php`
- [ ] J'ai uploadé tous les fichiers sur mon serveur
- [ ] J'ai testé le formulaire
- [ ] J'ai reçu l'email de test

### Pour EmailJS
- [ ] J'ai créé un compte EmailJS
- [ ] J'ai configuré un Service
- [ ] J'ai créé un Template
- [ ] J'ai copié Public Key, Service ID, Template ID
- [ ] J'ai modifié `script-emailjs.js` avec mes IDs
- [ ] J'ai ajouté le script EmailJS dans `index.html`
- [ ] J'ai changé `script.js` → `script-emailjs.js`
- [ ] J'ai testé le formulaire
- [ ] J'ai reçu l'email de test

---

## 🎉 Félicitations !

Votre formulaire de contact est maintenant opérationnel ! Les visiteurs peuvent vous contacter directement depuis votre portfolio.

**Bon développement ! 🚀**

---

*Créé le 6 novembre 2025*
*Pour toute question, ouvrez les fichiers d'aide inclus*

