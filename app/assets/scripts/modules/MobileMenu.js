import $ from 'jquery';

class MobileMenu{
    constructor(){
        this.menuIcon=$(".hero-section_menu-icon");
        this.menuContenct=$(".hero-section_menu-links");
        this.links=$(".hero-section_menu-links a");
        this.events();
    }
    
    events(){
        this.menuIcon.click(this.toggleTheMenu.bind(this));
        this.links.click(this.toggleTheMenu.bind(this));
    }

    toggleTheMenu(){
        this.menuContenct.toggleClass("hero-section_menu-links-visible");
        this.menuIcon.toggleClass("hero-section_menu-icon-close-x");
    }
}

export default MobileMenu;