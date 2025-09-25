// Configuración de i18next
        i18next.init({
            lng: 'es', // Idioma por defecto
            debug: false,
            resources: {
                es: {
                    translation: {
                        // Navegación
                        "nav.home": "Inicio",
                        "nav.about": "Nosotros",
                        "nav.services": "Servicios",
                        "nav.contact": "Contacto",
                        
                        // Index 
                        "hero.email": "Correo electrónico"
                    }
                },
                en: {
                    translation: {
                        // Navigation
                        "nav.home": "Home",
                        "nav.about": "About Us",
                        "nav.services": "Services",
                        "nav.contact": "Contact",
                        
                        // Index
                        "hero.email": "Email"
                    }
                }
            }
        }, function(err, t) {
            // Inicializar contenido una vez cargados los recursos
            updateContent();
        });

        // Función para actualizar todo el contenido de la página
        function updateContent() {
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                element.textContent = i18next.t(key);
            });
            
            // Actualizar el texto del botón de idioma
            document.getElementById('currentLanguage').textContent = 
                i18next.language === 'es' ? 'Español' : 'English';
        }

        // Cambiar idioma
        function changeLanguage(lng) {
            i18next.changeLanguage(lng, (err, t) => {
                if (err) return console.log('Error al cambiar idioma:', err);
                updateContent();
                
                // Actualizar clases activas en el dropdown
                document.querySelectorAll('.language-option').forEach(option => {
                    if (option.getAttribute('data-lang') === lng) {
                        option.classList.add('active');
                    } else {
                        option.classList.remove('active');
                    }
                });
            });
        }

        // Manejar el dropdown de idiomas
        document.getElementById('languageBtn').addEventListener('click', function() {
            document.getElementById('languageDropdown').classList.toggle('show');
        });

        // Cerrar dropdown al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.language-selector')) {
                document.getElementById('languageDropdown').classList.remove('show');
            }
        });

        // Manejar selección de idioma
        document.querySelectorAll('.language-option').forEach(option => {
            option.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                changeLanguage(lang);
                document.getElementById('languageDropdown').classList.remove('show');
            });
        });

        // Detectar idioma del navegador al cargar la página
        window.addEventListener('load', function() {
            const browserLang = navigator.language.split('-')[0];
            if (browserLang === 'en') {
                changeLanguage('en');
            }
        });