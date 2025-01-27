import requests
import json
import os
from datetime import datetime
from typing import List, Dict, Any

class APIDocsGenerator:
    def __init__(self, base_url: str, endpoints: List[Dict[str, str]]):
        self.base_url = base_url
        self.endpoints = endpoints
        self.output_dir = "api_examples"
        
    def create_output_directory(self) -> None:
        """Create the output directory if it doesn't exist."""
        if not os.path.exists(self.output_dir):
            os.makedirs(self.output_dir)
            
    def fetch_endpoint_response(self, endpoint: Dict[str, str]) -> Dict[str, Any]:
        """Fetch the response from an endpoint."""
        try:
            response = requests.get(endpoint['example'], timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            return {
                "error": f"Failed to fetch endpoint: {str(e)}",
                "timestamp": datetime.now().isoformat()
            }

    def test_endpoint(self, endpoint: Dict[str, str]) -> Dict[str, Any]:
        """Test an endpoint and return status information."""
        try:
            response = requests.get(endpoint['example'], timeout=10)
            return {
                'status_code': response.status_code,
                'success': response.status_code == 200,
                'response_time': response.elapsed.total_seconds(),
                'timestamp': datetime.now().isoformat()
            }
        except requests.exceptions.RequestException as e:
            return {
                'status_code': 0,
                'success': False,
                'error': str(e),
                'timestamp': datetime.now().isoformat()
            }

    def generate_test_results(self) -> str:
        """Generate markdown formatted test results for all endpoints."""
        test_results = "# API Endpoints Test Results\n\n"
        test_results += f"Test Run Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n"
        test_results += "| Endpoint | Status | Response Time | Result |\n"
        test_results += "|----------|--------|---------------|--------|\n"

        for endpoint in self.endpoints:
            print(f"Testing endpoint: {endpoint['path']}...")
            test_data = self.test_endpoint(endpoint)
            
            status = "✅" if test_data['success'] else "❌"
            response_time = f"{test_data['response_time']:.2f}s" if 'response_time' in test_data else "N/A"
            result = f"Status {test_data['status_code']}"
            if not test_data['success']:
                result += f" ({test_data.get('error', 'Failed')})"

            test_results += f"| {endpoint['path']} | {status} | {response_time} | {result} |\n"

        return test_results

    def generate_markdown_example(self, endpoint: Dict[str, str], response_data: Dict[str, Any]) -> str:
        """Generate a markdown formatted example for the endpoint."""
        markdown = f"## {endpoint['path']}\n\n"
        markdown += f"**Method:** {endpoint['method']}\n\n"
        markdown += f"**Description:** {endpoint['description']}\n\n"
        markdown += "**Example Request:**\n```http\n"
        markdown += f"GET {endpoint['example']}\n```\n\n"
        markdown += "**Example Response:**\n```json\n"
        markdown += json.dumps(response_data, indent=2, ensure_ascii=False)
        markdown += "\n```\n\n"
        return markdown

    def generate_all_examples(self) -> None:
        """Generate API documentation and test results."""
        self.create_output_directory()
        
        # Start with a header for the documentation
        all_examples = "# API Documentation\n\n"
        all_examples += f"Base URL: {self.base_url}\n\n"
        
        for endpoint in self.endpoints:
            print(f"Fetching response for {endpoint['path']}...")
            response_data = self.fetch_endpoint_response(endpoint)
            all_examples += self.generate_markdown_example(endpoint, response_data)
        
        # Save complete documentation
        filepath = os.path.join(self.output_dir, "api_documentation.md")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(all_examples)
        
        print("\nAPI documentation generation completed!")
        print(f"Documentation has been saved to '{filepath}'")

        # Generate test results
        test_results = self.generate_test_results()
        test_filepath = os.path.join(self.output_dir, "api_test_results.md")
        with open(test_filepath, 'w', encoding='utf-8') as f:
            f.write(test_results)
        
        print(f"Test results have been saved to '{test_filepath}'")

def main():
    # Base URL and endpoints configuration
    base_url = 'https://vacance-scolaire.pages.dev/api'
    
    endpoints = [
        {
            'method': 'GET',
            'path': '/api',
            'description': 'Get API information and available endpoints',
            'example': f'{base_url}'
        },
        {
            'method': 'GET',
            'path': '/api/general',
            'description': 'Get all general calendar events',
            'example': f'{base_url}/general'
        },
        {
            'method': 'GET',
            'path': '/api/general/next',
            'description': 'Get the next upcoming general event',
            'example': f'{base_url}/general/next'
        },
        {
            'method': 'GET',
            'path': '/api/general/upcoming',
            'description': 'Get all upcoming general events',
            'example': f'{base_url}/general/upcoming'
        },
        {
            'method': 'GET',
            'path': '/api/university',
            'description': 'Get all university calendar events',
            'example': f'{base_url}/university'
        },
        {
            'method': 'GET',
            'path': '/api/university/next',
            'description': 'Get the next upcoming university event',
            'example': f'{base_url}/university/next'
        },
        {
            'method': 'GET',
            'path': '/api/university/upcoming',
            'description': 'Get all upcoming university events',
            'example': f'{base_url}/university/upcoming'
        },
        {
            'method': 'GET',
            'path': '/api/ofppt',
            'description': 'Get all OFPPT calendar events',
            'example': f'{base_url}/ofppt'
        },
        {
            'method': 'GET',
            'path': '/api/ofppt/next',
            'description': 'Get the next upcoming OFPPT event',
            'example': f'{base_url}/ofppt/next'
        },
        {
            'method': 'GET',
            'path': '/api/ofppt/upcoming',
            'description': 'Get all upcoming OFPPT events',
            'example': f'{base_url}/ofppt/upcoming'
        }
    ]

    # Create and run the generator
    generator = APIDocsGenerator(base_url, endpoints)
    generator.generate_all_examples()

if __name__ == "__main__":
    main()