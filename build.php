<?php

require_once 'vendor/autoload.php';

use Goutte\Client;

$client = new Client();

$crawler = $client->request('GET', 'http://www.afup.org/pages/phptourlyon2014/deroulement.php');

$speakers = array();
$sessions = array();

$crawler->filter('.deroulements .deroulement')->each(function ($node) use (&$speakers, &$sessions) {
        $speaker =  $node->filter('.conferenciers')->first()->text();
        $session = $node->filter('.session')->first()->text() . "\n";
        $attributes = $node->filter('.session a')->first()->extract('href');
        $href = array_shift($attributes);
        $link = 'http://www.afup.org/pages/phptourlyon2014/' . $href;

        $speakers[] = $speaker;
        $sessions[] = array(
            'text' => $session,
            'name' => $speaker,
            'link' => $link,
        );
});


echo 'var names = ';
echo json_encode($speakers);
echo ';';

echo 'var confs = ';
echo json_encode($sessions);
echo ';';
