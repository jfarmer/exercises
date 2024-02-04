require_relative 'binary_tree'

# Implement a binary search tree.
# See http://en.wikipedia.org/wiki/Binary_search_tree
# Operations to support:
#   include?(value)     Average O(log n) time
#   insert(value)       Average O(log n) time
#   remove(value)       Average O(log n) time
#   empty?              O(1) time

def BinarySearchTree(value, left = EmptyTree, right = EmptyTree)
  case value
  when BinarySearchTree
    value
  when nil
    EmptyTree
  else
    BinarySearchTree.new(value, left, right)
  end
end

class EmptyTree
  def self.insert(value)
    BinarySearchTree(value)
  end

  def self.left
    EmptyTree
  end

  def self.right
    EmptyTree
  end

  def self.find(value)
    nil
  end

  def self.find_tree(value)
    nil
  end

  def self.remove(value)
    EmptyTree
  end

  def self.value
    nil
  end

  def self.height
    0
  end

  def self.empty?
    true
  end

  def self.present?
    !empty?
  end
end

class BinarySearchTree
  attr_accessor :value, :left, :right

  def initialize(value, left = EmptyTree, right = EmptyTree)
    @value = value
    @left  = left
    @right = right
  end

  def insert(value)
    case value <=> self.value
    when -1
      BinarySearchTree(self.value, left.insert(value), right)
    when 0
      self
    when 1
      BinarySearchTree(self.value, left, right.insert(value))
    end
  end

  def find_tree(value)
    case value <=> self.value
    when -1
      left.find_tree(value)
    when 0
      self
    when 1
      right.find_tree(value)
    end
  end

  def find(value)
    find_tree(value) || nil
  end

  def include?(value)
    !find(value).nil?
  end

  def height
    1 + [left.height, right.height].max
  end

  def remove(value, parent = nil)
    if value < self.value
      BinarySearchTree(self.value, self.left.remove(value), self.right)
    elsif value > self.value
      BinarySearchTree(self.value, self.left, self.right.remove(value))
    # Cases for when value == self.value
    elsif left.present? && right.present?
      left_max = left.max
      BinarySearchTree(left_max, self.left.remove(left_max), self.right)
    elsif left.empty?
      right
    elsif right.empty?
      left
    end
  end

  def max
    if right.empty?
      self.value
    else
      right.max
    end
  end

  def min
    if left.empty?
      self.value
    else
      left.min
    end
  end

  def empty?
    false
  end

  def present?
    !empty?
  end
end
