// Menu data: the single source of truth for every section, item and price.
// Prices are in whole pence (e.g. 899 = £8.99) so totals never suffer floating-point errors.
// Columns and order match the cafe's display slide (see reference/menu-photo.jpg).
// After editing, bump CACHE_VERSION in sw.js so installed tablets pick up the change.
window.MENU = [
  [ // Column 1
    { title: 'Starter - Soup', items: [
      ['Tomato', 400],
      ['Mushroom', 420],
      ['Chicken', 430],
      ['Vegetable', 450],
      ['Potato & Leek', 480],
    ]},
    { title: 'Baps', items: [
      ['Chicken', 350],
      ['Ham', 350],
      ['Beef', 360],
      ['Bacon', 370],
      ['Sausages', 370],
      ['Prawn', 380],
    ]},
  ],
  [ // Column 2
    { title: 'Jacket Potato – With Side Salad', items: [
      ['Baked Beans', 400],
      ['Ham', 430],
      ['Cheese', 430],
      ['Tuna', 470],
      ['Baked Beans & Cheese', 500],
    ]},
    { title: 'Main Meal', items: [
      ['Meal salad bowl', 600],
      ['Pizza 10”', 899],
      ['Chicken Curry & Rice', 1050],
      ['Spaghetti Bolognese', 1150],
      ['Roast Dinner', 1500],
    ]},
    { title: 'Side Orders', items: [
      ['Salad', 200],
      ['Chips', 300],
      ['Garlic Bread', 300],
      ['Garlic Bread & Cheese', 400],
    ]},
  ],
  [ // Column 3
    { title: 'Desserts', items: [
      ['Ice Cream', 250],
      ['Fruit Salad', 350],
      ['Apple Pie', 450],
      ['Cheesecake of the Day', 475],
    ]},
    { title: 'Hot Drinks', items: [
      ['Tea', 350],
      ['Coffee', 450],
      ['Hot Chocolate', 480],
    ]},
    { title: 'Soft Drinks', items: [
      ['Bottle of Water', 150],
      ['Can of Cola', 160],
      ['Can of Lemonade', 160],
      ['Bottle of Cola', 199],
    ]},
  ],
];
