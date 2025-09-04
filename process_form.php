<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Adatok gyűjtése az űrlapról
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    // E-mail cím, ahova az üzeneteket küldjük
    $recipient = "koronataxi130@gmail.com"; // Cseréld le a Korona Taxi e-mail címére

    // E-mail tárgya és tartalma
    $subject = "Új üzenet a weboldalról: $name";
    $email_content = "Név: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Üzenet:\n$message\n";

    // E-mail fejléce
    $email_headers = "From: $name <$email>";

    // E-mail küldése
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        // Sikeres küldés esetén átirányít a főoldalra
        header("Location: index.html?success=true");
        exit;
    } else {
        // Hiba esetén
        header("Location: index.html?success=false");
        exit;
    }
} else {
    // Ha nem POST kérés érkezik, visszairányítjuk
    header("Location: index.html");
    exit;
}
?>