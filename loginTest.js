const { Builder, By, until } = require('selenium-webdriver');

async function loginTest() {
    // Inicializa el driver
    let driver = await new Builder().forBrowser('chrome').build();
    
    try {
        // Navega a la página de inicio de sesión de OrangeHRM
        await driver.get('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        
        // Espera hasta que el campo de nombre de usuario esté presente
        await driver.wait(until.elementLocated(By.name('username')), 1000);
        
        // Encuentra el campo de nombre de usuario y escribe el nombre de usuario
        await driver.findElement(By.name('username')).sendKeys('Admin');
        
        // Encuentra el campo de contraseña y escribe la contraseña
        await driver.findElement(By.name('password')).sendKeys('admin123');
        
        // Encuentra el botón de inicio de sesión y haz clic en él
        await driver.findElement(By.css('button[type="submit"]')).click();
        
        // Espera hasta que la página siguiente esté cargada (un elemento específico de la página de inicio)
        await driver.wait(until.elementLocated(By.css('.oxd-topbar-header-breadcrumb h6')), 10000);

        // Verifica que el inicio de sesión haya sido exitoso comprobando la presencia de un elemento del dashboard
        let dashboardText = await driver.findElement(By.css('.oxd-topbar-header-breadcrumb h6')).getText();
        if (dashboardText === 'Dashboard') {
            console.log('Login test passed');
        } else {
            console.log('Login test failed');
        }
    } finally {
        // Cierra el navegador
        await driver.quit();
    }
}

loginTest();
