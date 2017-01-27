
{$content = $app.cms.context.content}
{$name = $content->data->getName()}
{$address = $content->data->getAddress()}
{$postalcode = $content->data->getPostalCode()}
{$city = $content->data->getCity()}
{$addressFull = "`$address`, `$postalcode` `$city`, Belgium"}
{$addressURL = $addressFull|replace:" ":"+"|replace:"&":"+"}

{$mapLinkURL = "https://www.google.com/maps/dir/current+location/`$addressURL`"}
{$mapImageURL = "http://maps.googleapis.com/maps/api/staticmap?center=`$addressURL`&zoom=13&size=600x300&maptype=roadmap&format=png&visual_refresh=true&markers=size:mid%7Ccolor:red%7Clabel:1%7C`$addressURL`"}

<a href="{$mapLinkURL}">
    <img src="{$mapImageURL}">
</a>
