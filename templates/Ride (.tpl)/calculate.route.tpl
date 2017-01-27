{$location = "{$content->data->getNumber()|replace:' ':'+'}+{$content->data->getStreet()|replace:' ':'+'}+{$content->data->getPostalCode()|replace:' ':'+'}+{$content->data->getCity()|replace:' ':'+'}"}

<a href="https://www.google.be/maps/dir/current+location/{$location}/" target="_blank"><i class="icon icon--location-on"></i> {"label.calculate.route"|translate}</a></p>
