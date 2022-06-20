import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-mapviz',
  templateUrl: './mapviz.component.html',
  styleUrls: ['./mapviz.component.scss'],
})
export class MapvizComponent implements OnInit {
  private svg: any;
  private g: any;
  arr: string[] = [];
  selectInfo = new BehaviorSubject(this.arr);
  public info: string;
  public res: string = "";
  public counties = Array();
  public countiesNonNorm = Array();
  public isSmallArea = false;

  constructor(private http: HttpClient) {
    this.http.get<any>('http://localhost:7200/repositories/epc\?query\=PREFIX%20rdf%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%20PREFIX%20gn%3A%20%3Chttps%3A%2F%2Fwww.geonames.org%2Fontology%23%3E%20PREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%20prefix%20mss-o%3A%20%3Chttp%3A%2F%2Fmulti-spatial-scale.com%2Fontology%23%3E%20select%20%3Fcountyname%20%3Fo%20where%20%7B%20%20%09%3Fs%20rdf%3Atype%20mss-o%3ACounty%20.%20%20%20%20%20%3Fs%20mss-o%3AT9_2_HT%20%3Fo.%20%20%20%20%20%3Fs%20rdfs%3Alabel%20%3Fcountyname.%20%7D%20limit%20100').subscribe(data => {
      let allNums = Array();

      this.res = data.results.bindings;
      for (let i = 0; i < data.results.bindings.length; i++) {
        this.countiesNonNorm[data.results.bindings[i].countyname.value] = data.results.bindings[i].o.value;
        this.counties[data.results.bindings[i].countyname.value] = data.results.bindings[i].o.value;
        allNums.push(data.results.bindings[i].o.value);
      }
      function normalize_array(arr: any[]) {

        let normalize = function(val: number, max: number, min: number) { 
          return(val - min) / (max - min); 
        }
      
        let max = Math.max.apply(null, arr) 
        let min = Math.min.apply(null, arr)
      
        let hold_normed_values: number[]=[]
        arr.forEach(function(this_num: any) {
          hold_normed_values.push(normalize(this_num, max, min))
        })
      
        return(hold_normed_values)
      
      }

      const normalized = normalize_array(allNums);
      for (let i = 0; i < data.results.bindings.length; i++) {
        this.counties[data.results.bindings[i].countyname.value] = normalized[i];
      }      
    });
    this.info = "test"; 

  }

  private async fetchData(geofilepath: string): Promise<any> {
    const bb: any = await d3.json(geofilepath);
    return bb;
  };

  
  public addSelectInfo(item: any) {
    this.selectInfo.next(item);
  }


  public async mapUrl() {
    this.isSmallArea = true;
    const url = "assets/eds.geojson";
    // const url = "assets/Small_Areas_Ungeneralised_-_OSi_National_Statistical_Boundaries_-_2015.geojson";
    this.svg.remove();
    this.drawMap(url);
  }

  private async drawMap(url: string): Promise<void> {
    const counties = this.counties;
    const countiesNonNorm = this.countiesNonNorm;
    const mouseover_wrapper = (d: any, i: any) => {
      this.selectInfo.next([i.properties['NAME_TAG'] + " (" + countiesNonNorm[i.properties['NAME_TAG']] + ")."]);
    }

    const mouseout_wrapper = (d: any, i: any) => {
      this.selectInfo.next(i.properties['NAME_TAG']);
    }

    const click_wrapper = (d: any, i: any) => {
      this.selectInfo.next(i.properties['NAME_TAG']);
    }

    const isSmallArea = this.isSmallArea;
    let bb = await this.fetchData(url);
    var bbox = (d3.select('body').node() as any).getBoundingClientRect()
    var width = window.innerWidth;
    var height = window.innerHeight;
    var projection = d3.geoEqualEarth();
    projection.fitExtent([[20, 20], [width, height]], bb);
    var geoGenerator: any = d3.geoPath().projection(projection);
    this.svg = d3.select("body").append('svg')
        .style("width", "100%")
        .style("height", "100%");
    this.g = this.svg.append('g')
    this.g.selectAll('path')
    .data(bb.features)
    .enter()
    .append('path')
    .attr('d', geoGenerator)
    .attr("fill", (d: any, i: any) => {
      if (isSmallArea) {
        return "#088"
      }else{
        return d3.interpolateRdBu(counties[d.properties["NAME_TAG"]])
      }
      
    })
    .attr('stroke', '#000')
    .on("mouseover", function(d: any, i: any) {
      mouseover_wrapper(d, i);
    })
    .on("mouseout", function(d: any, i: any) {
      mouseout_wrapper(d, i);
    })
    .on("click", function(d: any, i: any) {
      click_wrapper(d, i);
    });
  }

  ngOnInit(): void {
    this.drawMap("assets/counties.geojson");
  }
}
