//הפיכת הכפתור לפעיל
function enableButton() {
    var name = document.getElementById("fullName").value; //משתנה שקולט את השם
    var adress = document.getElementById("adress").value; //משתנה שקולט את הערכים של הכתובת
    var shipping = checkSelectionShipping(); //קולט מהפונקציה ערך של מה שהמשתמש בחר ברדיו
    var plent = selectPlent();//קולט מהפונקציה ערך של מה שהמשתמש בחר בCHACKBOX בתוך מערך
    

    var regex = /^[א-תa-zA-Z\s]+$/; //משתנה שמגדיר מה מותר שיהיה
    
    if (name.length > 1 && adress.length > 1 && shipping && plent.length > 0) { //בודק שהמשתמש הזין הכל לפי התנאים הנדרשים
        if (!regex.test(name)) { //בודק האם המשתמש הזין רק אותיות בשם
            alert("השם שהקשת לא תקין"); //מראה התראה במידה והקיש מקש לא תקין
        }
        else {
            activateButton()//קורא לפונקציית הפעלת הכפתור
        }
    }
    else {
        deactivateButton()// קורא לפונקציית כיובי הכפתור
    }
}

//פונקציה להפעלת הכפתור
function activateButton() {
    var order = document.getElementById("order");
    order.style.opacity = 1; // משנה בCSS את הנראות של הכפתור ל100%
    order.style.cursor = 'pointer'; //משנה את הנראות של העכבר כאשר עומדים על הכפתור שניתן ללחוץ
    order.disabled = false; //מבטל את חוסר הפעילות של הכפתור
}

//פונקציה לכיבוי הכפתור
function deactivateButton() {
    var order = document.getElementById("order");
    order.style.opacity = 0.5; // משנה בCSS את הנראות של הכפתור ל50%
    order.style.cursor = 'not-allowed'; //משנה את הנראות של העכבר כאשר עומדים על הכפתור שלא ניתן ללחוץ
    order.disabled = true; // גורם לכפתור להיות לא פעיל
}

//פונקציה שמופעלת הלחיצה על הכפתור היא קולטת את הנתונים שנכניס לפונקציית ההתראה שם יודפסו
function btn() {
    // קליטה של כל הנתונים כמשתנים
    var name = document.getElementById("fullName").value;
    var adress = document.getElementById("adress").value;
    var shipping = checkSelectionShipping();
    var plent = selectPlent();
    var addToShipping = selectAddToShipping();
    var message = document.getElementById("message").value;

    // יצירת הסיכום כמשתנה
    var summery = "הזמנתך הושלמה בהצלחה<br/>" +
        "שם: " + name +
        "<br>כתובת: " + adress +
        "<br>בחרת במשלוח: " + shipping.toString() +
        "<br>הצמחים שבחרת: " + plent.toString() +
        "<br>דברים נוספים שבחרת: " + addToShipping.toString() +
        "<br>הערות: " + message;

    // הצגת ההתראה
    showAlert(summery);
}

//הצגת ההתראה
function showAlert(message) {
    var alertBox = document.getElementById('customAlert'); //מגדיר תיבת התראה בHTML ואת הנראות בCSS 
    document.getElementById('alertMessage').innerHTML = message; //משתנה הקולט מה לכתוב בתיבה
    alertBox.style.display = 'block'; //גורם להופעת התיבה
}

//סגירת ההתראה
function closeAlert() {
    var alertBox = document.getElementById('customAlert'); //מגדיר תיבת התראה בHTML ואת הנראות בCSS 
    alertBox.style.display = 'none'; //סוגר את התיבה
    clear();
}


//פונקציה שבודקת מה נבחר בכפתורי רדיו
function checkSelectionShipping() {
    var homeRadio = document.querySelector('input[name="shipping"][value="home"]');
    //משתנה מהHTML את הערך שעונה על הקרטיריונים של NAME SHIPPING וVALUE HOME
    var pickupRadio = document.querySelector('input[name="shipping"][value="pickup"]');
    //משתנה מהHTML את הערך שעונה על הקרטיריונים של NAME SHIPPING וVALUE PICKUP
    var homeImg = document.getElementById('home');// מקבל משתנה של התמונה של משלוח עד הבית
    var pickupImg = document.getElementById('pickup'); // מקבל משתנה של תמונ ה של איסוף עצמי

    homeImg.style.opacity = '0.5'; //משנה את התמונה לשקיפות 0.5
    pickupImg.style.opacity = '0.5'; //משנה את התמונה לשקיפות 0.5

    if (homeRadio.checked) { //אם נבחר לחצן המשלוח הביתה משנה שקיפות של התמונה שלו ומחזיר את הערך שלו
        homeImg.style.opacity = '1'; //משנה את התמונה לשקיפות 1
        return "עד הבית"; //הערך שמוחזר
    }
    else if (pickupRadio.checked) { //אם נבחר לחצן האיסוף משנה שקיפות של התמונה שלו ומחזיר את הערך שלו
        pickupImg.style.opacity = '1'; //משנה את התמונה לשקיפות 1
        return "איסוף עצמי"; //הערך שמוחזר
    }
    else {
        return null; // אם לא נבחר כלום מחזיר כלום
    }
}

// שימוש בפונקציה עם אופציות שונות
function selectOptionsAndUpdateImages(options) { //פוקציה שקולטת משתנה
    var selectedOptions = []; //יצירת מערך ריק
    
    for (var i = 0; i < options.length; i++) {
        var option = options[i]; //מכניס למשתנה ערך של המיקום הנוכחי במערך
        var checkbox = document.querySelector('input[type="checkbox"][value="' + option + '"]');
        //מכניס למשתנה את הערך הרלוונטי בצק בוקס
        var imgElement = document.getElementById(option); //מכניס את התמונה הרלוונטית למשתנה

        if (checkbox && checkbox.checked) { //בודק האם קיים ערך והאם הצק בוקס של הערך נבחר
            selectedOptions[selectedOptions.length] = option; //מכניס למערך החדש שייצרנו במקום האחרון את הערך הנבדק
            if (imgElement) { //אם התמונה קיימת 
                imgElement.style.opacity = '1'; // משנה את שקיפות התמונה ל1
            }
        }
        else {
            imgElement.style.opacity = '0.5'; // משנה את שקיפות התמונה ל0.5
        }
    }
    return selectedOptions; //מחזיר את המערך שייצרנו עם הערכים שנבחרו
}

function selectPlent() { //פונקציה של אופציות הצמחים
    var plentOptions = ["KAMMI", "STREPTOCRAPA", "DURATI", "SHOETIME", "PHOLIANA"];
    // יצירת מערך עם האופציות לבדיקה
    return selectOptionsAndUpdateImages(plentOptions);
    //מחזיר את התוצאה של הפונקצית בדיקה שקיבלה את המערך שיצרנו
}

function selectAddToShipping() { //פונקציה של אופציות הבחירה הנוספות
    var addToShippingOptions = ['מסמרי תליה', 'חוט מתכת', 'אבני נוי', 'בקבוק ספריי להשקייה', 'אדנית נתלת'];
    // יצירת מערך עם האופציות לבדיקה
    return selectOptionsAndUpdateImages(addToShippingOptions);
    //מחזיר את התוצאה של הפונקצית בדיקה שקיבלה את המערך שיצרנו
}
