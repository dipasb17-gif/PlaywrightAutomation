const test=require('@playwright/test');
const {expect}=require('@playwright/test');
test("End to End Flow", async ({ browser,page }) =>
{
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
const username=page.locator("#userEmail");
const password=page.locator("#userPassword");
const login=page.locator("#login");
const prodName="ADIDAS ORIGINAL";
await username.type("rahulsh@gmail.com");
await password.type("Rahul@1209");
await login.click();
await page.waitForLoadState('networkidle');
await page.locator(".card-body b").first().waitFor();
const titles=await page.locator(".card-body b").allTextContents();
console.log(titles.length);
const products=page.locator(".card-body");
const total=await products.count();
for(let i=0;i<total;i++)
{
    if(await products.nth(i).locator("b").textContent()===prodName)
    {
        await products.nth(i).locator("text= Add To Cart").click();
        break;
    }
}
await page.locator("[routerlink*='cart']").click();
await page.locator("div li").first().waitFor();
const bool =await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
expect(bool).toBeTruthy();
await page.locator("text=Checkout").click();
await page.locator("[placeholder*=Country]").pressSequentially("ind",{delay:100});
const options=page.locator(".ta-results");
await options.waitFor();
const buttons=await options.locator("button").count();
for(let i=0;i<buttons;i++)
{
    const text=await options.locator("button").nth(i).textContent();
    if(text===" India")
    {
        await options.locator("button").nth(i).click();
        break;
    }   
}
// Month dropdown - try these selectors
const monthDropdown = page.locator('select').first();
await monthDropdown.selectOption('06'); // Select July
// Year dropdown - try these selectors 
const yearDropdown = page.locator('select').nth(1); 
await yearDropdown.selectOption('17'); // Select 2017

await page.locator("div[class*='small'] input[type='text']").first().fill("123456");
await page.locator("div[class*='field'] input[type='text']").nth(1).fill("123");
await page.locator("input[name='coupon']").fill("rahulshettyacademy");
await page.locator("button[type='submit']").click();
await page.locator("a[class*='btnn']").click();
await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
const orderid=await page.locator("label[class='ng-star-inserted']").textContent();
console.log(orderid);
await page.locator("button[routerlink*='myorders']").click();
await page.locator("tbody").waitFor();
const rows=await page.locator("tbody tr");

for(let i=0;i<await rows.count();i++)
{
const actorderid=await rows.nth(i).locator("th").first().textContent();
if(orderid.includes(actorderid))
{
    console.log("Order found:", actorderid);
    await rows.nth(i).locator("button").first().click();
    break;
}
}
expect(orderid.includes(await page.locator(".col-text.-main").textContent())).toBeTruthy();   
await page.pause();
});