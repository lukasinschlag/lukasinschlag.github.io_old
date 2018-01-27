var dynamicTabBar = window.dynamicTabBar = new mdc.tabs.MDCTabBar(document.querySelector('#dynamic-tab-bar'));
var dots = document.querySelector('.dots');
var panels = document.querySelector('.panels');

var langEN = document.querySelector('#langEN');
var langDE = document.querySelector('#langDE');

dynamicTabBar.tabs.forEach(function(tab) {
    tab.preventDefaultOnClick = true;
});

var menuEl = document.querySelector('#demo-menu');
var menu = new mdc.menu.MDCSimpleMenu(menuEl);
var toggle = document.querySelector('.toggle');
toggle.addEventListener('click', function() {
    menu.open = !menu.open;
});

function updateDot(index) {
    var activeDot = dots.querySelector('.dot.active');
    if (activeDot) {
        activeDot.classList.remove('active');
    }
    var newActiveDot = dots.querySelector('.dot:nth-child(' + (index + 1) + ')');
    if (newActiveDot) {
        newActiveDot.classList.add('active');
    }
}

function updatePanel(index) {
    var activePanel = panels.querySelector('.panel.active');
    if (activePanel) {
        activePanel.classList.remove('active');
    }
    var newActivePanel = panels.querySelector('.panel:nth-child(' + (index + 1) + ')');
    if (newActivePanel) {
        newActivePanel.classList.add('active');
    }

    var logoC = document.querySelector('.logo-c');
    var card1 = document.querySelector('.card-hb1');
    var card2 = document.querySelector('.card-hb2');
    rippleActivate();
    switch(index){
        case 0:
            logoC.style.setProperty('background-color', 'rgba(13, 71, 161, 0.95)');
            card1.style.setProperty('background-color', 'rgba(13, 71, 161, 0.95)');
            card2.style.setProperty('background-color', 'rgba(21, 101, 192, 0.85)');
            break;
        case 1:
            logoC.style.setProperty('background-color', 'rgba(255, 160, 0, 0.95)');
            card1.style.setProperty('background-color', 'rgba(255, 160, 0, 0.95)');
            card2.style.setProperty('background-color', 'rgba(255, 179, 0, 0.90)');
            break;
        case 2:
            logoC.style.setProperty('background-color', 'rgba(158, 158, 158, 0.95)');
            card1.style.setProperty('background-color', 'rgba(158, 158, 158, 0.95)');
            card2.style.setProperty('background-color', 'rgba(189, 189, 189, 0.85)');
            break;
    }
}

function rippleActivate() {
    var ripple = document.querySelector('.ripple');
    ripple.style.setProperty('top', '30');
    ripple.style.setProperty('left', '30');
    ripple.classList.add('animate');

    $(".ripple").delay(800).queue(function() {  // Wait for 1 second.
            $(this).removeClass("animate").dequeue();
        }
    );
}

dynamicTabBar.listen('MDCTabBar:change', function ({detail: tabs}) {
    var nthChildIndex = tabs.activeTabIndex;

    updatePanel(nthChildIndex);
    updateDot(nthChildIndex);

    var activeTab = document.querySelector('.mdc-tab.mdc-ripple-upgraded--background-focused');
    if(activeTab){
        activeTab.classList.remove('.mdc-ripple-upgraded--background-focused')
    }
});

dots.addEventListener('click', function (evt) {
    if (!evt.target.classList.contains('dot')) {
        return;
    }

    evt.preventDefault();

    var dotIndex = [].slice.call(dots.querySelectorAll('.dot')).indexOf(evt.target);

    if (dotIndex >= 0) {
        dynamicTabBar.activeTabIndex = dotIndex;
    }

    updatePanel(dotIndex);
    updateDot(dotIndex);
});

// initial data binding
$.getJSON("res/data_en.json", function(json) {
    $('body').loadJSON(json);
    console.log(json);
});

langEN.addEventListener('click', function (evt) {
    if (!evt.target.classList.contains('mdc-button')) {
        return;
    }
    evt.preventDefault();

    document.querySelector('#langDE').classList.remove('active');
    langEN.classList.add('active');
    $.getJSON("res/data_en.json", function(json) {
        $('body').loadJSON(json);
    });
    rippleActivate();
});

langDE.addEventListener('click', function (evt) {
    if (!evt.target.classList.contains('mdc-button')) {
        return;
    }
    evt.preventDefault();

    document.querySelector('#langEN').classList.remove('active');
    langDE.classList.add('active');
    $.getJSON("res/data_de.json", function(json) {
        $('body').loadJSON(json);
    });
    rippleActivate();
});