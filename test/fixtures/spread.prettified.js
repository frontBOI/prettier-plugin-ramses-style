const object = {
  // Force l'utilisation de Google Map si la librairie est présente?
  // EnableGmap: true,
  // Activer la recherche de la position lorsque le navigateur de l'utilisateur le supporte?
  // EnableGeolocalisatedSearch: "true",
  // Spécifier l'utilisation de votre feuille de style CSS lorsque vous lui donnez la valeur "0"
  CSS: '1', // Afficher les informations du point relais à la sélection sur la carte?
  // Activer le zoom on scroll sur la carte des résultats?
  //,MapScrollWheel: "false",
  // Activer le mode Street View sur la carte des résultats (attention aux quotas imposés par Google)
  // MapStreetView: "false"
  DisplayMapInfo: true,
  //
  // Paramétrage d'affichage du widget.
  //
  // Afficher les résultats sur une carte?
  ShowResultsOnMap: true,
  Target: '#Target_Widget',
  // Pays utilisé pour la recherche: code ISO 2 lettres.
  Country: defaultCountry || 'FR',
  // Mode de livraison (Standard [24R], XL [24L], XXL [24X], Drive [DRI])
  ColLivMod: deliveryMode || '24R',
  // Code postal pour lancer une recherche par défaut
  PostCode: defaultPostcode || '59000',
  // Selecteur de l'élément dans lequel est envoyé l'ID du Point Relais pour affichage
  TargetDisplay: '#TargetDisplay_Widget',
  // Spécifier le nombre de jours entre la recherche et la dépose du colis dans notre réseau
  // SearchDelay: "3",
  // Limiter la recherche des Points Relais à une distance maximum
  // SearchFar: "",
  // Liste des pays selectionnable par l'utilisateur pour la recherche: codes ISO 2 lettres
  AllowedCountries: allowedCountries || 'FR', // Nombre de Point Relais à afficher
  NbResults: nbResults ? '' + nbResults : '7', // Selecteur de l'élément dans lequel sont envoysé les coordonnées complètes du point relais
  TargetDisplayInfoPR: '#TargetDisplayInfoPR_Widget', //
  // Autres paramétrages.
  //
  // Filtrer les Points Relais selon le Poids (en grammes) du colis à livrer
  ...(weight && { Weight: weight }), //
  // Paramétrage du widget pour obtention des point relais.
  //
  // Le code client Mondial Relay, sur 8 caractères (si test, ajouter des espaces à droite, ex: "BDTEST  ")
  // BDTEST est utilisé pour les tests => un message d'avertissement apparaît
  Brand: brandIdAPI === 'BDTEST' ? 'BDTEST  ' : brandIdAPI, // Fonction de callback déclenché lors de la selection d'un Point Relais
  OnParcelShopSelected: (data) => {
    onParcelShopSelected({ ...data, ParcelShopID: targetDisplayRef.current?.value })
  },
}
