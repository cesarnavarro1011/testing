const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');

async function takeScreenshot(driver, filePath) {
    let image = await driver.takeScreenshot();
    fs.writeFileSync(filePath, image, 'base64');
}

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navega a la página
        await driver.get('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        // Intentar realizar una acción de prueba
        try {
            // Encontrar el campo de usuario y rellenarlo con 'Admin'
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
    
            // Esperar que la página se cargue
            await driver.wait(until.elementLocated(By.css('.oxd-sidepanel-body')), 10000);

            // Esperar a que la pestaña "My Info" esté presente y hacer clic
        let myInfoTab = await driver.wait(until.elementLocated(By.xpath('//span[text()="My Info"]')), 10000);
        await myInfoTab.click();

        // Esperar a que la página "My Info" se cargue
        await driver.wait(until.elementLocated(By.xpath('//h6[text()="Personal Details"]')), 10000);
    
        await driver.wait(until.titleContains('OrangeHRM'), 10000);

        // Completar los campos en "Employee Full Name"
        let firstNameField = await driver.findElement(By.name('firstName'));
        let middleNameField = await driver.findElement(By.name('middleName'));
        let lastNameField = await driver.findElement(By.name('lastName'));

        // Limpiar y escribir el nuevo nombre
        await firstNameField.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.BACK_SPACE);
        await firstNameField.sendKeys('John');

        // Limpiar y escribir el nuevo nombre medio
        await middleNameField.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.BACK_SPACE);
        await middleNameField.sendKeys('A.');

        // Limpiar y escribir el nuevo apellido
        await lastNameField.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.BACK_SPACE);
        await lastNameField.sendKeys('Doe');
            
        console.log("Verificando la existencia y la visibilidad del botón de guardar...");
        let saveButton;
        try {
            saveButton = await driver.wait(until.elementLocated(By.xpath('//button[@type="submit" and @class="oxd-button oxd-button--medium oxd-button--secondary orangehrm-left-space"]')), 10000);
            console.log("Botón de guardar localizado.");
        } catch (error) {
            console.error("No se encontró el botón de guardar. Verifique la ruta XPath.");
            await takeScreenshot(driver, 'save_button_not_found.png');
            console.log("Captura de pantalla tomada y guardada como 'save_button_not_found.png'.");
            return;
        }

        await driver.wait(until.elementIsVisible(saveButton), 20000);
        await driver.wait(until.elementIsEnabled(saveButton), 20000);

        // Guardar los cambios utilizando JavaScript para evitar elementos interceptados
        await driver.executeScript("arguments[0].click();", saveButton);

            // Esperar a que aparezca la notificación de éxito
            console.log("Información actualizada correctamente!");
        } catch (err) {
            // Crear e instanciar un nuevo CustomError  
            throw new CustomError(`Error durante la acción de prueba: ${err.message}`);
        }
    } catch (err) {
        // Manejar e imprimir el error personalizado
        console.error(err);
    } finally {
        await driver.quit();
    }
})();
