<?php

class motor{
    public string $name ;
    public int $age ;

    public function __construct(string $name, int $age)
    {
        $this->name = $name;
        $this->age = $age;

    }
}

   $motor = new motor("honda",20);
    $motor2 = new motor("suzuki",30);


   echo $motor2->name;

?>

