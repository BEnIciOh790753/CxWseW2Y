// 代码生成时间: 2025-10-11 02:15:29
import { Injectable } from '@angular/core';

// FirewallRule represents a single firewall rule.
interface FirewallRule {
  id: number;
  action: string;
  protocol: string;
  source: string;
  destination: string;
  port: number;
}

// FirewallRulesService manages the firewall rules.
@Injectable({
  providedIn: 'root',
})
export class FirewallRulesService {
  // Array to store firewall rules.
  private rules: FirewallRule[] = [];

  // Method to add a new firewall rule.
  addRule(rule: FirewallRule): void {
    try {
      // Validate rule before adding.
      this.validateRule(rule);
      // Add the rule to the array.
      this.rules.push(rule);
      console.log('Rule added:', rule);
    } catch (error) {
      // Handle validation errors.
      console.error('Error adding rule:', error);
    }
  }

  // Method to remove a firewall rule by ID.
  removeRule(id: number): void {
    this.rules = this.rules.filter(rule => rule.id !== id);
    console.log('Rule removed with ID:', id);
  }

  // Method to retrieve all firewall rules.
  getAllRules(): FirewallRule[] {
    return this.rules;
  }

  // Private method to validate a firewall rule.
  private validateRule(rule: FirewallRule): void {
    if (!rule.action || !rule.protocol || !rule.source || !rule.destination || rule.port === undefined) {
      throw new Error('Rule is missing required fields.');
    }
    // Additional validation logic can be added here.
  }
}

// FirewallRuleComponent is the UI component to interact with the firewall rules.
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirewallRulesService } from './firewall_rules_manager'; // Adjust the import path as necessary.

@Component({
  selector: 'app-firewall-rule',
  template: `<form [formGroup]="form" (ngSubmit)="addRule()">
    <input formControlName="action" placeholder="Action"/>
    <input formControlName="protocol" placeholder="Protocol"/>
    <input formControlName="source" placeholder="Source IP"/>
    <input formControlName="destination" placeholder="Destination IP"/>
    <input formControlName="port" placeholder="Port" type="number"/>
    <button type="submit">Add Rule</button>
  </form>
  <ul>
    <li *ngFor="let rule of rules">
      {{ rule.action }}: {{ rule.protocol }} - {{ rule.source }} to {{ rule.destination }}:{{ rule.port }}
      <button (click)="removeRule(rule.id)">Remove</button>
    </li>
  </ul>`,
  styleUrls: ['./firewall_rule.component.css'],
})
export class FirewallRuleComponent {
  form: FormGroup;
  rules: FirewallRule[] = [];

  constructor(private fb: FormBuilder, private firewallRulesService: FirewallRulesService) {
    this.form = this.fb.group({
      action: ['', Validators.required],
      protocol: ['', Validators.required],
      source: ['', Validators.required],
      destination: ['', Validators.required],
      port: ['', [Validators.required, Validators.min(1)]]
    });
  }

  // Method to add a new rule.
  addRule(): void {
    this.form.disable();
    const rule = this.form.value;
    this.firewallRulesService.addRule({
      id: Math.floor(Math.random() * 10000), // Temporary ID generation for demo purposes.
      ...rule
    });
    this.rules = this.firewallRulesService.getAllRules();
    this.form.reset();
    this.form.enable();
  }

  // Method to remove a rule.
  removeRule(id: number): void {
    this.firewallRulesService.removeRule(id);
    this.rules = this.firewallRulesService.getAllRules();
  }

  // Method to fetch and display all rules.
  ngOnInit(): void {
    this.rules = this.firewallRulesService.getAllRules();
  }
}
