import os
import json
from datasets import load_dataset

def download_and_process_race():
    print("Loading RACE dataset...")
    dataset = load_dataset('race', split=['train', 'validation'])
    
    train_data = dataset[0]
    val_data = dataset[1]
    
    all_articles = []
    article_id = 0
    
    print("Processing training data...")
    for item in train_data:
        level = item['race_id'].split('_')[0]
        if level not in ['middle', 'high']:
            continue
            
        questions = []
        for i in range(len(item['questions'])):
            answer_map = {'A': 0, 'B': 1, 'C': 2, 'D': 3}
            questions.append({
                'question': item['questions'][i],
                'options': item['options'][i],
                'answer_index': answer_map.get(item['answers'][i], 0)
            })
        
        article = {
            'id': f'race_{article_id}',
            'level': level,
            'article': item['article'],
            'questions': questions
        }
        all_articles.append(article)
        article_id += 1
    
    print("Processing validation data...")
    for item in val_data:
        level = item['race_id'].split('_')[0]
        if level not in ['middle', 'high']:
            continue
            
        questions = []
        for i in range(len(item['questions'])):
            answer_map = {'A': 0, 'B': 1, 'C': 2, 'D': 3}
            questions.append({
                'question': item['questions'][i],
                'options': item['options'][i],
                'answer_index': answer_map.get(item['answers'][i], 0)
            })
        
        article = {
            'id': f'race_{article_id}',
            'level': level,
            'article': item['article'],
            'questions': questions
        }
        all_articles.append(article)
        article_id += 1
    
    os.makedirs('data', exist_ok=True)
    output_path = 'data/reading_materials.json'
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(all_articles, f, ensure_ascii=False, indent=2)
    
    print(f"Success! Saved {len(all_articles)} articles to {output_path}")
    print(f"Middle school: {sum(1 for a in all_articles if a['level'] == 'middle')}")
    print(f"High school: {sum(1 for a in all_articles if a['level'] == 'high')}")

if __name__ == '__main__':
    download_and_process_race()