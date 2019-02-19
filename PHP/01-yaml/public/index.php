<?php

require './../vendor/autoload.php';

use Symfony\Component\Yaml\Yaml;

try {
    $value = Yaml::parse(file_get_contents('./../config/params.yaml'));
    dump($value);
}
catch (\Exception $e) {
    printf("Impossible de parser le fichier YAML : %s", $e->getMessage());
}
