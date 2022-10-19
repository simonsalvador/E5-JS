const carta = [
    {
        id : 1,
        name : 'Muzzarella',
        description : 'Solo para expertos',
        prize : '$900',
        img : './assets/comida-img/muzza.jpg',
        category : 'pizzas',
    } ,
    {
        id : 2,
        name : 'Napolitana',
        description : '',
        prize : '$1200',
        img : './assets/comida-img/napolitana.jpg',
        category : 'pizzas',
    } ,
    {
        id : 3,
        name : 'Fugazzeta',
        description : '',
        prize : '$1100',
        img : './assets/comida-img/fugazzeta.jpg',
        category : 'pizzas',
    } ,
    {
        id : 4,
        name : '4 Quesos',
        description : '',
        prize : '$1400',
        img : './assets/comida-img/4quesos.jpg',
        category : 'pizzas',
    } ,
    {
        id : 5,
        name : 'Veggie',
        description : '',
        prize : '$1430',
        img : './assets/comida-img/veggie.jpg',
        category : 'pizzas',
    } ,
    {
        id : 6,
        name : 'Doble Cheddar',
        description : '',
        prize : '$800',
        img : './assets/comida-img/doble_cheddar.jpg',
        category : 'hamburguesas',
    } ,
    {
        id : 7,
        name : 'Triple Bacon',
        description : '',
        prize : '$1100',
        img : './assets/comida-img/triple_bacon.jpg',
        category : 'hamburguesas',
    } ,
    {
        id : 8,
        name : 'Jamón Serrano',
        description : '',
        prize : '$900',
        img : './assets/comida-img/jamon_serrano.jpg',
        category : 'hamburguesas',
    } ,
    {
        id : 9,
        name : 'Papás Fritas',
        description : '',
        prize : '$700',
        img : './assets/comida-img/papas.jpg',
        category : 'napapuki',
    } ,
    {
        id : 10,
        name : 'Super Cheddar',
        description : '',
        prize : '$900',
        img : './assets/comida-img/papas_cheddar.png',
        category : 'napapuki',
    } ,
    {
        id : 11,
        name : 'Vegetariano',
        description : '',
        prize : '$600',
        img : '',
        category : 'wraps',
    } ,
    {
        id : 12,
        name : 'Chicken Wrap',
        description : '',
        prize : '$800',
        img : '',
        category : 'wraps',
    } ,
    {
        id : 13,
        name : 'Tacos',
        description : '',
        prize : '$1200',
        img : '',
        category : 'mexican-food',
    } ,
    {
        id : 14,
        name : 'Nachos',
        description : '',
        prize : '$900',
        img : '',
        category : 'mexican-food',
    } ,
    {
        id : 15,
        name : 'Batido de chocolate',
        description : '',
        prize : '$600',
        img : '',
        category : 'batidos',
    } ,
    {
        id : 16,
        name : 'Batido de frutilla',
        description : '',
        prize : '$600',
        img : '',
        category : 'batidos',
    } ,

];

const splitProducts = (size) => {
    let dividedProducts = [];
    for (let i = 0; i < carta.length; i += size)
      dividedProducts.push(carta.slice(i, i + size));
    return dividedProducts;
};
  
const productsController = {
    dividedProducts: splitProducts(16), //  [[6],[6],[3]]
    nextProductsIndex: 1,
    productsLimit: splitProducts(16).length,
};