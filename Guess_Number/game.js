const myArr = [1, 2, 3];
const myArr2 = [4, 5, 6];
console.log(myArr + myArr2);
let course = [
  ["Data Science", "AI"],
  ["Aws", "Devops"],
  ["Frontend", ["Javascript"]],
];
console.log(course[2][1][0]);

let arr = ["vwefvkmw"];
arr[0].toLocaleUpperCase;

console.log(arr);
const number = [1, 2, 3, 4, 5];
console.log(number);
let person = { name: "Anthony" };
person = null;
const instructor = [person];

console.log(instructor);

const data = {
  products: [
    {
      prod1: {
        price: 1500,
      },
      prod2: {
        price: 1500,
      },
      prod3: {
        price: 1500,
      },
      prod4: {
        price: 1500,
      },
      prod5: {
        price: 1500,
      },
    },
  ],
  total: "5",
};
const {products}=data
console.log(products);
const priceArr=Object.keys(products[0]).map((item)=>products[0][item].price)
console.log(priceArr);
