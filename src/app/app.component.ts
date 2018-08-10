import { Component } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'public';
  abilities=[];
  ability_url=[];
  constructor(private _httpService: HttpService){}
  getPokemon(){
    let pokemon = this._httpService.getPokemon();
    pokemon.subscribe(data => {
      for (var ability in data['abilities']){
        this.abilities.push((data['abilities'][ability].ability.name))
        this.ability_url.push((data['abilities'][ability].ability.url))
      }
      console.log(data['name']+" has the following abilities: "+this.abilities)
      for (var url in this.ability_url){
        this.getAbilityCount(this.ability_url[url])
      }
    })
  }
  getAbilityCount(url){
    let ability = this._httpService.getAbilityCount(url);
    ability.subscribe(data => {
      console.log(data['pokemon'].length+" Pokemon have the "+data['name']+" ability: ")
      for (var i in data['pokemon']){
        console.log(data['pokemon'][i]['pokemon']['name'])
      }
    })
  }

  ngOnInit(){
    this.getPokemon()
  } 
}
