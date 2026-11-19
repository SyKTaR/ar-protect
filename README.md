# AR Protect

## Nettoyage des métadonnées d'images

Pour une nouvelle photo publique :

```bash
npm run images:strip-metadata -- public/chemin/vers/image.jpeg
```

Sans argument, la commande traite toutes les images JPG, JPEG, PNG, WebP et HEIC de `public/` :

```bash
npm run images:strip-metadata
```

Le script applique d'abord l'orientation EXIF aux pixels JPEG. Il utilise une transformation sans recompression quand les dimensions du JPEG le permettent ; sinon, il passe par Sharp en qualité élevée pour éviter tout décalage de pixels. Il supprime ensuite les métadonnées EXIF, XMP et IPTC, dont le GPS. Le profil colorimétrique ICC est conservé. Il vérifie enfin qu'aucune coordonnée GPS ne subsiste.

Prérequis locaux sur macOS :

```bash
brew install exiftool jpeg
```

Sharp est déclaré en dépendance de développement. Le script s'arrête avant traitement si cette dépendance manque alors qu'une orientation ne peut pas être appliquée parfaitement par `jpegtran`.
