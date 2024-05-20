const { Builder, By, Key, until } = require('selenium-webdriver');
const CustomError = require('./errorHandler');

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
    
             // Completar los campos en "Employee Full Name"
        let firstNameField = await driver.findElement(By.name('firstName'));
        let middleNameField = await driver.findElement(By.name('middleName'));
        let lastNameField = await driver.findElement(By.name('lastName'));

        await firstNameField.clear();  // Limpiar el campo antes de escribir
        await firstNameField.sendKeys('Adan');  // Escribir el nuevo nombre

        await middleNameField.clear();  // Limpiar el campo antes de escribir
        await middleNameField.sendKeys('camacho');  // Escribir el nuevo nombre medio

        await lastNameField.clear();  // Limpiar el campo antes de esc                  ribir
        await lastNameField.sendKeys('adanoel');  // Escribir el nuevo apellido

            // Hacer clic en el botón de guardar
            await driver.executeScript("arguments[0].click();", await driver.findElement(By.xpath('//button[@type="submit" and @class="oxd-button oxd-button--medium oxd-button--secondary orangehrm-left-space"]')));

            // Esperar a que la notificación de éxito se muestre
            let toastMessage = await driver.wait(until.elementLocated(By.xpath('//div[contains(@class, "oxd-toast-content oxd-toast-content--success")]')), 10000);
            // Verificar que el mensaje contiene texto indicando que se guardó exitosamente
            let successMessage = await toastMessage.getText();
            if (successMessage.includes('Success')) {
                console.log("Prueba exitosa: Los campos 'Employee Full Name' se completaron y guardaron correctamente.");
            } else {
                console.error("Prueba fallida: El mensaje de éxito no apareció.");
            }
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
