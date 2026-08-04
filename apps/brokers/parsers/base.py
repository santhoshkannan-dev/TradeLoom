from abc import ABC, abstractmethod


class CSVParser(ABC):
    @abstractmethod
    def parse(self, file_content):
        """
        Parses CSV content and returns a list of standardized transaction dicts.
        """
        pass
