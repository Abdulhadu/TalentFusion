from api.hr_recruiter.Resources import DEGREES_IMPORTANCE
import spacy
from spacy.pipeline import EntityRuler

class cvinfoExtraction:

    def __init__(self, skills_patterns_path, majors_patterns_path, degrees_patterns_path, resume):
        self.resume = resume[['parsedData']]
        self.skills_patterns_path = skills_patterns_path
        self.majors_patterns_path = majors_patterns_path
        self.degrees_patterns_path = degrees_patterns_path
        self.degrees_importance = DEGREES_IMPORTANCE

    @staticmethod
    def match_majors_by_spacy(self,  resume):
        nlp = spacy.blank("en")
        # Add the pattern to the matcher
        patterns_path = self.majors_patterns_path
        entity_ruler = EntityRuler(nlp)
        entity_ruler.from_disk(patterns_path)
        nlp.add_pipe(entity_ruler)
        # Process some text
        doc1 = nlp(resume)
        acceptable_majors = []
        for ent in doc1.ents:
            labels_parts = ent.label_.split('|')
            if labels_parts[0] == 'MAJOR':
                print((ent.text, ent.label_))
                if labels_parts[2].replace('-', ' ') not in acceptable_majors:
                    acceptable_majors.append(labels_parts[2].replace('-', ' '))
        return acceptable_majors

    @staticmethod
    def match_degrees_by_spacy(self, resume):
        nlp = spacy.blank("en")
        # Add the pattern to the matcher
        patterns_path = self.degrees_patterns_path
        entity_ruler = EntityRuler(nlp)
        entity_ruler.from_disk(patterns_path)
        nlp.add_pipe(entity_ruler)

        # Process some text
        doc1 = nlp(resume)
        degree_levels = []
        for ent in doc1.ents:
            labels_parts = ent.label_.split('|')
            print(labels_parts)
            if labels_parts[0] == 'DEGREE':
                print((ent.text, ent.label_))
                if labels_parts[1] not in degree_levels:
                    degree_levels.append(labels_parts[1])
        return degree_levels

    @staticmethod
    def match_skills_by_spacy(self, resume):
        nlp = spacy.blank("en")
        patterns_path = self.skills_patterns_path
        entity_ruler = EntityRuler(nlp)
        entity_ruler.from_disk(patterns_path)
        nlp.add_pipe(entity_ruler)
        # Process some text
        doc1 = nlp(resume)
        resume_skills = []
        for ent in doc1.ents:
            labels_parts = ent.label_.split('|')
            if labels_parts[0] == 'SKILL':
                print((ent.text, ent.label_))
                if labels_parts[1].replace('-', ' ') not in resume_skills:
                    resume_skills.append(labels_parts[1].replace('-', ' '))
        return resume_skills

    @staticmethod
    def get_minimum_degree(self, degrees):
        """get the minimum degree that the candidate has"""
        d = {degree: self.degrees_importance[degree] for degree in degrees}
        return min(d, key=d.get)

    def extract_entities(self, resume):
        # recognize and extract entities
        resume['Minimum degree level'] = ""
        resume['Acceptable majors'] = ""
        resume['Skills'] = ""
        for i, row in resume.iterrows():
            processed_resume = row['parsedData'].replace('. ', ' ')
            print("Processed Resume:", processed_resume)
            degrees = self.match_degrees_by_spacy(self, processed_resume)
            print("Extracted Degrees:", degrees)
            if len(degrees) != 0:
                resume['Minimum degree level'][i] = self.get_minimum_degree(self, degrees)
            else:
                resume['Minimum degree level'][i] = ""
            resume['Acceptable majors'][i] = self.match_majors_by_spacy(self, processed_resume)
            resume['Skills'][i] = self.match_skills_by_spacy(self, processed_resume)
        return resume
