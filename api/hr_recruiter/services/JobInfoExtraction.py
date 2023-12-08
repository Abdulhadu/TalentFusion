from api.hr_recruiter.Resources import DEGREES_IMPORTANCE
import spacy
from spacy.pipeline import EntityRuler

class JobInfoExtraction:

    def __init__(self, skills_patterns_path, majors_patterns_path, degrees_patterns_path, jobs):
        self.jobs = jobs[['Job description']]
        self.skills_patterns_path = skills_patterns_path
        self.majors_patterns_path = majors_patterns_path
        self.degrees_patterns_path = degrees_patterns_path
        self.degrees_importance = DEGREES_IMPORTANCE
       

    def match_majors_by_spacy(self, job):
        nlp = spacy.blank("en")
        patterns_path = self.majors_patterns_path
        entity_ruler = EntityRuler(nlp)
        entity_ruler.from_disk(patterns_path)
        nlp.add_pipe(entity_ruler)
        doc1 = nlp(job)
        acceptable_majors = []
        for ent in doc1.ents:
            labels_parts = ent.label_.split('|')
            if labels_parts[0] == 'MAJOR':
                major = labels_parts[2].replace('-', ' ')
                if major not in acceptable_majors:
                    acceptable_majors.append(major)
        return acceptable_majors

    def match_degrees_by_spacy(self, job):
        nlp = spacy.blank("en")
        patterns_path = self.degrees_patterns_path
        entity_ruler = EntityRuler(nlp)
        entity_ruler.from_disk(patterns_path)
        nlp.add_pipe(entity_ruler)
        doc1 = nlp(job)
        degree_levels = []
        for ent in doc1.ents:
            labels_parts = ent.label_.split('|')
            if labels_parts[0] == 'DEGREE':
                degree_levels.append(labels_parts[1])
        return degree_levels

    def match_skills_by_spacy(self, job):
        nlp = spacy.blank("en")
        patterns_path = self.skills_patterns_path
        entity_ruler = EntityRuler(nlp)
        entity_ruler.from_disk(patterns_path)
        nlp.add_pipe(entity_ruler)
        doc1 = nlp(job)
        job_skills = []
        for ent in doc1.ents:
            labels_parts = ent.label_.split('|')
            if labels_parts[0] == 'SKILL':
                skill = labels_parts[1].replace('-', ' ')
                if skill not in job_skills:
                    job_skills.append(skill)
        return job_skills

    def get_minimum_degree(self, degrees):
        """get the minimum degree that the candidate has"""
        d = {degree: self.degrees_importance[degree] for degree in degrees}
        return min(d, key=d.get)

    def extract_entities(self, jobs):
        # recognize and extract entities
        jobs['Minimum degree level'] = ""
        jobs['Acceptable majors'] = ""
        jobs['Skills'] = ""
        for i, row in jobs.iterrows():
            job = jobs['Job description'][i].replace('. ', ' ')
            
            # Process degrees
            degrees = self.match_degrees_by_spacy(job)
            if len(degrees) != 0:
                jobs['Minimum degree level'][i] = self.get_minimum_degree(degrees)
            else:
                jobs['Minimum degree level'][i] = ""

            # Process majors
            majors = self.match_majors_by_spacy(job)
            jobs['Acceptable majors'][i] = majors

            # Process skills
            skills = self.match_skills_by_spacy(job)
            jobs['Skills'][i] = skills

        return jobs
