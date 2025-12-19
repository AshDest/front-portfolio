# Configuration du Formulaire de Contact

## 📧 Configuration de l'Email

Pour recevoir les messages de contact sur votre adresse email, suivez ces étapes :

### 1. Configurer votre adresse email

Ouvrez le fichier `send-email.php` et modifiez cette ligne :

```php
$to_email = "votre-email@example.com"; // CHANGEZ PAR VOTRE ADRESSE EMAIL
```

Remplacez `"votre-email@example.com"` par votre vraie adresse email.

### 2. Configuration du serveur

Le formulaire utilise la fonction PHP `mail()` qui nécessite un serveur web avec PHP installé.

#### Option A : Hébergement Web (Recommandé)
Si vous hébergez votre site sur un serveur web (comme OVH, Hostinger, etc.), la fonction `mail()` devrait fonctionner directement.

#### Option B : Serveur Local (XAMPP, WAMP, MAMP)
Si vous testez en local, vous devez configurer un serveur SMTP :

1. **Avec XAMPP :**
   - Ouvrez `php.ini`
   - Configurez ces lignes :
   ```ini
   [mail function]
   SMTP = smtp.gmail.com
   smtp_port = 587
   sendmail_from = votre-email@gmail.com
   ```

2. **Alternative recommandée pour le développement local :**
   Utilisez un service comme **Mailtrap** ou **MailHog** pour tester les emails en local.

### 3. Alternative : EmailJS (Sans Backend PHP)

Si vous préférez une solution sans serveur PHP, vous pouvez utiliser EmailJS :

1. Créez un compte sur [EmailJS](https://www.emailjs.com/)
2. Configurez un service email
3. Remplacez le code JavaScript dans `index.html` et `script.js`

Exemple avec EmailJS :

```javascript
// Installez EmailJS
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

// Dans votre JavaScript
emailjs.init("VOTRE_PUBLIC_KEY");

document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    emailjs.sendForm('VOTRE_SERVICE_ID', 'VOTRE_TEMPLATE_ID', this)
        .then(() => {
            alert('✅ Message envoyé avec succès!');
            this.reset();
        }, (error) => {
            alert('❌ Erreur: ' + error.text);
        });
});
```

### 4. Tester le Formulaire

1. Assurez-vous que votre serveur PHP est actif
2. Ouvrez votre site dans un navigateur
3. Remplissez le formulaire de contact
4. Cliquez sur "Send Message"
5. Vérifiez votre boîte mail (et le dossier spam!)

## 🔒 Sécurité

Le fichier `send-email.php` inclut déjà :
- ✅ Validation des données
- ✅ Protection contre les injections
- ✅ Limitation aux requêtes POST
- ✅ Headers CORS configurés

## 📝 Structure des Fichiers

```
myportfolio/
├── index.html          (Formulaire de contact avec attributs name)
├── script.js           (Gestion AJAX du formulaire)
├── send-email.php      (Backend pour l'envoi d'emails)
└── README-EMAIL.md     (Ce fichier)
```

## ⚠️ Problèmes Courants

1. **"Mail not sent"** → Vérifiez la configuration SMTP de votre serveur
2. **404 Error** → Vérifiez que `send-email.php` est au même niveau que `index.html`
3. **CORS Error** → Assurez-vous d'accéder au site via un serveur web (http://localhost) et non file://

## 🎯 Prochaines Étapes

1. Modifiez `$to_email` dans `send-email.php` avec votre vraie adresse
2. Téléchargez les fichiers sur votre hébergement web
3. Testez le formulaire
4. Personnalisez le style du message de succès si souhaité

## 💡 Conseils

- Vérifiez toujours votre dossier spam la première fois
- Ajoutez votre domaine à la liste blanche de votre fournisseur email
- Pour un meilleur taux de délivrabilité, utilisez un service SMTP dédié comme SendGrid ou Mailgun

