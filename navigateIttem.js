const { Builder, By, Key, until } = require('selenium-webdriver');

async function navigateIttem() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
        // Navega a la página de inicio de sesión de OrangeHRM
        await driver.get('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        
        // Espera hasta que el campo de nombre de usuario esté presente
        await driver.wait(until.elementLocated(By.name('username')), 1000000);
        
        // Encuentra el campo de nombre de usuario y escribe el nombre de usuario
        await driver.findElement(By.name('username')).sendKeys('Admin');
        
        // Encuentra el campo de contraseña y escribe la contraseña
        await driver.findElement(By.name('password')).sendKeys('admin123');
        
        // Encuentra el botón de inicio de sesión y haz clic en él
        await driver.findElement(By.css('button[type="submit"]')).click();
        
        // Espera hasta que la página siguiente esté cargada (un elemento específico de la página de inicio)
        await driver.wait(until.elementLocated(By.css('.oxd-topbar-header-breadcrumb h6')), 1000000);
    
        // Verificar si el inicio de sesión fue exitoso
        let welcomeText = await driver.findElement(By.className('oxd-topbar-header-breadcrumb')).getText();
        if (welcomeText) {
            console.log('Inicio de sesión exitoso');
        } else {
            console.log('Error en el inicio de sesión');
        }

    // Desplazarse por el menú
    const menuItems = [
        { text: 'Admin', uniqueElement: '.oxd-table-filter' },
        { text: 'PIM', uniqueElement: '.orangehrm-background-container' },
        { text: 'Leave', uniqueElement: '.oxd-table-filter' },
        { text: 'Time', uniqueElement: '.orangehrm-card-container' },
        { text: 'Recruitment', uniqueElement: '.orangehrm-candidate-page' },
        { text: 'My Info', uniqueElement: '.oxd-layout-context' },
        { text: 'Performance', uniqueElement: '.oxd-topbar-body-nav' },
        { text: 'Dashboard', uniqueElement: '.oxd-layout-context' },
        { text: 'Directory', uniqueElement: '.oxd-table-filter' },
        { text: 'Claim', uniqueElement: '.oxd-layout-context' } // Ajuste este selector según la estructura real de la página
      ];
  
      for (let menuItem of menuItems) {
        // Esperar a que el enlace del menú sea visible
        await driver.wait(until.elementLocated(By.xpath(`//span[text()='${menuItem.text}']`)), 10000);
        // Hacer clic en el enlace del menú
        await driver.findElement(By.xpath(`//span[text()='${menuItem.text}']`),10000).click();
        // Esperar a que la página correspondiente cargue completamente
        await driver.wait(until.elementLocated(By.css(menuItem.uniqueElement)), 10000);
        console.log(`Navegado a ${menuItem.text}`);
      }

      // Esperar 10 segundos antes de cerrar sesión
    await driver.sleep(5000);

    await driver.findElement(By.className('oxd-userdropdown-tab')).click();

    // Esperar 2 segundos para mostrar el menú de usuario abierto
    await driver.sleep(2000);

    await driver.wait(until.elementLocated(By.xpath("//a[text()='Logout']")), 10000).click();
    console.log('Sesión cerrada');

    await driver.sleep(5000);


  } finally {
    // Cerrar el navegador al finalizar
    console.log(`Navegación exitosa`);
    await driver.quit();
  }
}

navigateIttem();
